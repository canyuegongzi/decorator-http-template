import { join, dirname, extname, basename, normalize } from 'path'

import nodeResolver from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import json from '@rollup/plugin-json'

import clear from 'rollup-plugin-clear'
import progress from 'rollup-plugin-progress'

import externals from 'rollup-plugin-node-externals'

import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

import filesize from 'rollup-plugin-filesize'
import visualizer from 'rollup-plugin-visualizer'

import parsePackageName from 'parse-pkg-name'

import snakeCase from 'lodash/snakeCase'

import pkg from './package.json'

const pkgName = parsePackageName(pkg.name).name

const formats = {
    commonjs: {
        format: 'cjs',
        file: join(__dirname, pkg.main),
        exports: 'named'
    },
    esm: {
        format: 'esm',
        file: join(__dirname, pkg.module),
        exports: 'named'
    },
    umd: {
        format: 'umd',
        name: snakeCase(pkgName),
        exports: 'named',
        globals: {}
    }
}

const config = {
    input: './src/index.ts',
    output: [formats.esm, formats.commonjs],
    plugins: [
        clear({ targets: getCleanPaths() }),
        progress({ clearLine: false }),
        externals({ deps: true }),
        nodeResolver(),
        commonjs(),
        json(),
        replace({
            preventAssignment: true,
            __VERSION__: pkg.version,
            NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                  module: 'es2015',
                  declaration: true,
                  declarationDir: 'dist'
                },
              exclude: [
                "/src/test/**.ts"
              ]
            }
        })
    ],
    watch: {
        include: 'src/**'
    }
}

// 生成分析报告
if (process.env['npm_config_analyze']) {
    config.plugins.push(
        visualizer({
            title: `${pkg.name} - ${pkg.author.name}`,
            filename: 'dist/bundle-analyzer-report.html'
        })
    )
}

if (formats.umd) {
    const cjsFile = formats.commonjs.file
    const umdFile = basename(cjsFile, extname(cjsFile))

    config.output.push({
        ...formats.umd,
        file: join(dirname(cjsFile), `${umdFile}.umd.js`),
        plugins: [filesize()]
    })

    config.output.push({
        ...formats.umd,
        sourcemap: true,
        file: join(dirname(cjsFile), `${umdFile}.umd.min.js`),
        plugins: [terser()]
    })
}

function getCleanPaths() {
    const paths = new Set([
        normalize(dirname(formats.commonjs.file)),
        normalize(dirname(formats.esm.file))
    ])
    return Array.from(paths).filter((path) => path !== __dirname)
}

export default config
