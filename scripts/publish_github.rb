require "base64"
require "json"
require "open3"
require "tempfile"
require "tmpdir"

ROOT = File.expand_path("..", __dir__)
REPO = "darcyrobb1/drobbmedia"
BRANCH = "main"
GH = "/Users/darcyrobb/.local/bin/gh"

FILES = [
  "index.html",
  "galleries.html",
  "contact.html",
  "vercel.json",
  "package.json",
  "README.md",
  "src/data.js",
  "src/main.js",
  "src/styles.css",
  "assets/styles.css",
  "assets/main.js",
  "assets/drobbmedia-logo.png",
  "assets/generated/drobbmedia-hero-placeholder.png"
] + Dir[
  File.join(ROOT, "assets/photos/{sport,commercial,event}/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}")
].map { |path| path.delete_prefix("#{ROOT}/") }.uniq.sort

def gh_json(*args)
  stdout, stderr, status = Open3.capture3(GH, "api", *args)
  abort(stderr.empty? ? stdout : stderr) unless status.success?
  stdout.empty? ? nil : JSON.parse(stdout)
end

def gh_put(path, payload)
  Tempfile.create(["gh-payload", ".json"]) do |file|
    file.write(JSON.pretty_generate(payload))
    file.flush
    gh_json(
      "--method", "PUT",
      "repos/#{REPO}/contents/#{path}",
      "--input", file.path
    )
  end
end

FILES.each do |path|
  absolute = File.join(ROOT, path)
  content = Base64.strict_encode64(File.binread(absolute))
  current = nil

  stdout, _stderr, status = Open3.capture3(GH, "api", "repos/#{REPO}/contents/#{path}?ref=#{BRANCH}")
  current = JSON.parse(stdout) if status.success? && !stdout.empty?

  payload = {
    message: "Remake DRobbMedia website",
    content: content,
    branch: BRANCH
  }
  payload[:sha] = current["sha"] if current && current["sha"]

  result = gh_put(path, payload)
  puts "#{current ? "updated" : "created"} #{path} -> #{result.fetch("commit").fetch("sha")[0, 12]}"
end
