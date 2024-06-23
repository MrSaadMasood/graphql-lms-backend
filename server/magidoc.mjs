import path from "path"
import { fileURLToPath } from "url"

function relativePath(location) {
  return path.join(path.dirname(fileURLToPath(import.meta.url)), location)
}

function websiteConfig(configName) {
  if (configName === "auth") return { appTitle: "Authentication", siteRoot: "/auth" }
  else if (configName === "user") return { appTitle: "User", siteRoot: "/user" }
  else if (configName === "admin") return { appTitle: "Admin", siteRoot: "/admin" }
  else if (configName === "tokenManager") return { appTitle: "Token Manger", siteRoot: "/token-manager" }
  else throw new Error("incorrect config name provided")
}
function allConfigFiles() {
  return [
    websiteConfig("auth"),
    websiteConfig("user"),
    websiteConfig("admin"),
    websiteConfig("tokenManager")
  ]
}

const target = process.env.CONFIG
const currentConfig = websiteConfig(target)
const otherConfigs = allConfigFiles().filter(thisConfig => {
  return currentConfig.appTitle !== thisConfig.appTitle
})

export default {
  introspection: {
    type: 'sdl',
    // paths: ['src/query/**/schema.graphqls', 'src/query/admin/schema.graphql', 'src/query/user/schema.graphql',
    //   'src/query/tokenManager/schema.graphql'],
    paths: [relativePath(`./src/query/${target}/schema.graphql`)]
  },
  website: {
    template: 'carbon-multi-page',
    output: relativePath(`./website${currentConfig.siteRoot}`),
    siteMeta: {
      description: `Graphql LMS API documentation for the ${currentConfig.appTitle} route`
    },
    extenalLinks: otherConfigs.map(config => {
      return {
        href: config.siteRoot,
        label: config.appTitle,
        group: "Other Schemas"
      }
    }),
    options: {
      appTitle: "GraphQl LMS backend API documentation"
    },
  },
}
