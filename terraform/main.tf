provider "docker" {}

resource "docker_image" "node" {
  name = "node:18"
}

resource "docker_container" "ci_cd_app" {
  name  = "ci_cd_demo"
  image = docker_image.node.latest
  ports {
    internal = 3000
    external = 3000
  }
}
