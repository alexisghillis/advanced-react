const sass = require('sass');
const Path = require('path');
const fs = require('fs');

const getComponents = () => {
    let allComponents = []

    const types = ['atoms', 'molecules', 'organisms']

    types.forEach(type => {
        const path = `scss/src/${type}`
        const allFiles = require('fs').readdirSync(path).map(file => ({
            input: `scss/src/${type}/${file}`,
            output: `scss/src/lib/css/${file.slice(0, -4) + 'css'}`
        }))

        allComponents = [
            ...allComponents,
            ...allFiles
        ]
})
return allComponents;
}

const compile = (path, fileName) => {
    try {
        const result = sass.renderSync({
            file: path,
            outFile: fileName
        });

        fs.writeFileSync(fileName, result.css.toString()); // Write the compiled CSS to the output file

        console.log('Compilation successful');
        console.log(result.css.toString());
    } catch (error) {
        console.error('Compilation failed:', error);
    }
}

compile('scss/src/global.scss', 'scss/src/lib/css/global.css');

console.log(getComponents())

getComponents().forEach(component => {
    compile(component.input, component.output)
})