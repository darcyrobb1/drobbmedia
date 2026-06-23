require "fileutils"
require "open3"
require "tmpdir"

ROOT = File.expand_path("..", __dir__)
REPO_URL = "https://github.com/darcyrobb1/drobbmedia.git"
BRANCH = "main"
PUBLISH_DIR = ENV.fetch("DROBBMEDIA_PUBLISH_DIR", File.join(Dir.tmpdir, "drobbmedia-publish"))

FILES = [
  "index.html",
  "galleries.html",
  "contact.html",
  "vercel.json",
  "package.json",
  "README.md",
  "robots.txt",
  "sitemap.xml",
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

def run!(*args, chdir: nil)
  stdout, stderr, status = Open3.capture3(*args, chdir: chdir)
  return stdout if status.success?

  command = args.join(" ")
  message = stderr.empty? ? stdout : stderr
  abort("Command failed: #{command}\n#{message}")
end

def git!(*args)
  run!("git", *args, chdir: PUBLISH_DIR)
end

def ensure_clone
  if File.directory?(File.join(PUBLISH_DIR, ".git"))
    git!("fetch", "origin", BRANCH)
    git!("checkout", BRANCH)
    git!("pull", "--ff-only", "origin", BRANCH)
    return
  end

  FileUtils.rm_rf(PUBLISH_DIR)
  FileUtils.mkdir_p(File.dirname(PUBLISH_DIR))
  run!("git", "clone", "--branch", BRANCH, REPO_URL, PUBLISH_DIR)
end

def copy_publish_files
  FILES.each do |path|
    source = File.join(ROOT, path)
    destination = File.join(PUBLISH_DIR, path)

    abort("Missing publish file: #{source}") unless File.file?(source)

    FileUtils.mkdir_p(File.dirname(destination))
    FileUtils.cp(source, destination, preserve: true)
  end
end

ensure_clone
copy_publish_files

git!("add", *FILES)

status = git!("status", "--porcelain")
if status.strip.empty?
  puts "No publish changes found. Nothing pushed."
  exit 0
end

message = ENV.fetch("DROBBMEDIA_COMMIT_MESSAGE", "Update DRobbMedia website")
git!("commit", "-m", message)
git!("push", "origin", BRANCH)

puts "Published one commit to #{BRANCH}."
