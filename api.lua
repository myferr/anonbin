local socket = require("socket")
local json = require("dkjson")
local lfs = require("lfs")

local PORT = 1141
local DATA_DIR = "data"
local CONTENT_DIR = DATA_DIR .. "/content"
local PUBLIC_JSON = DATA_DIR .. "/public.json"

-- Setup folders and files
lfs.mkdir(DATA_DIR)
lfs.mkdir(CONTENT_DIR)
if not io.open(PUBLIC_JSON, "r") then
    local f = io.open(PUBLIC_JSON, "w")
    f:write("[]")
    f:close()
end

local function generate_id()
    local chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    local id = ""
    for i = 1, 6 do
        local idx = math.random(1, #chars)
        id = id .. chars:sub(idx, idx)
    end
    return id
end

local function load_public_list()
    local f = io.open(PUBLIC_JSON, "r")
    local data = f:read("*a")
    f:close()
    return json.decode(data) or {}
end

local function save_public_list(list)
    local f = io.open(PUBLIC_JSON, "w")
    f:write(json.encode(list, { indent = true }))
    f:close()
end

local function save_paste(content, public)
    local id = generate_id()
    local path = CONTENT_DIR .. "/" .. id .. ".txt"
    local f = io.open(path, "w")
    f:write(content)
    f:close()
    if public then
        local list = load_public_list()
        table.insert(list, { id = id, created = os.date("!%Y-%m-%dT%H:%M:%SZ") })
        save_public_list(list)
    end
    return id
end

local function read_paste(id)
    local f = io.open(CONTENT_DIR .. "/" .. id .. ".txt", "r")
    if not f then return nil end
    local content = f:read("*a")
    f:close()
    return content
end

local function send_response(client, status, body, content_type)
    local headers = string.format(
        "HTTP/1.1 %d OK\r\nAccess-Control-Allow-Origin: *\r\nAccess-Control-Allow-Methods: GET, POST, OPTIONS\r\nAccess-Control-Allow-Headers: Content-Type\r\nContent-Type: %s\r\nContent-Length: %d\r\n\r\n",
        status, content_type, #body)
    client:send(headers .. body)
end

local server = assert(socket.bind("*", PORT))
print("Listening on port " .. PORT .. "...")

math.randomseed(os.time())

while true do
    local client = server:accept()
    if client then
        client:settimeout(1)

        local line, err = client:receive("*l")
        if not line then
            client:close()
        else
            local method, path = line:match("^(%u+)%s+([^%s]+)")
            local headers = {}
            local content_length = 0

            repeat
                line = client:receive("*l")
                if line then
                    local k, v = line:match("^(.-):%s*(.*)")
                    if k and v then
                        headers[k:lower()] = v
                        if k:lower() == "content-length" then
                            content_length = tonumber(v)
                        end
                    end
                end
            until not line or line == ""

            local body = ""
            if method == "POST" and content_length > 0 then
                body = client:receive(content_length)
            end

            if method == "OPTIONS" then
                send_response(client, 204, "", "text/plain")
            elseif method == "GET" and path == "/public" then
                local list = load_public_list()
                send_response(client, 200, json.encode(list), "application/json")
            elseif method == "GET" and path:match("^/view/[%w%d]+$") then
                local id = path:match("/view/([%w%d]+)")
                local content = read_paste(id)
                if content then
                    send_response(client, 200, json.encode({ id = id, content = content }), "application/json")
                else
                    send_response(client, 404, json.encode({ error = "Not found" }), "application/json")
                end
            elseif method == "POST" and path == "/submit" then
                local data = json.decode(body)
                if not data or not data.content then
                    send_response(client, 400, json.encode({ error = "Missing content" }), "application/json")
                else
                    local id = save_paste(data.content, data.public == true)
                    send_response(client, 200, json.encode({ id = id }), "application/json")
                end
            else
                send_response(client, 404, "Not Found", "text/plain")
            end

            client:close()
        end
    end
end
