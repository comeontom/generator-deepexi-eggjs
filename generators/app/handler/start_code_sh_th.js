'use strict';

const AbstractTemplateHandler = require('./abstract_template_handler');
const _ = require('lodash')
const fileUtils = require('../../util/file_utils')

class StartCodeTemplateHandler extends AbstractTemplateHandler {
  handle () {
    const tpl = _.template(this.generator.fs.read(this.generator.templatePath(this.tmpl)))
    let props = {
      commonScript: `bold=$(tput bold)
underline=$(tput sgr 0 1)
reset=$(tput sgr0)

red=$(tput setaf 1)
green=$(tput setaf 76)
white=$(tput setaf 7)
tan=$(tput setaf 202)
blue=$(tput setaf 25)

underline() { printf "\${underline}\${bold}%s\${reset}\\n" "$@"
}
h1() { printf "\\n\${underline}\${bold}\${blue}%s\${reset}\\n" "$@"
}
h2() { printf "\\n\${underline}\${bold}\${white}%s\${reset}\\n" "$@"
}
debug() { printf "\${white}%s\${reset}\\n" "$@"
}
info() { printf "\${white}➜ %s\${reset}\\n" "$@"
}
success() { printf "\${green}✔ %s\${reset}\\n" "$@"
}
error() { printf "\${red}✖ %s\${reset}\\n" "$@"
}
warn() { printf "\${tan}➜ %s\${reset}\\n" "$@"
}
bold() { printf "\${bold}%s\${reset}\\n" "$@"
}
note() { printf "\\n\${underline}\${bold}\${blue}Note:\${reset} \${blue}%s\${reset}\\n" "$@"
}`
    };
    _.assignIn(props, this.props);
    this.generator.fs.write(this.generator.destinationPath(fileUtils.tmplToFileName(this.tmpl)), tpl(props))
  }
}

module.exports = StartCodeTemplateHandler;