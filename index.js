import fs from "fs"
import path from "path"
export default class WebpackPluginTest {
  constructor(options) {
    this.options = Object.assign({output: "./fileMap.json"}, options);
  }
  apply(complier) {
    complier.plugin("emit", (compilation, cb) => {
      let out, context;
      const fileMap = {};
      const assets = compilation.assets;
      // console.log(Object.keys(compilation));
      compilation.chunks.map((chunk) => {
        if(chunk.name) {
          fileMap[chunk.name] = chunk.files;
        }
        else {
          let loc, block;
          chunk.blocks.map((b) => {
            block = b;
          });
          if(block) {
            let filePath;

            loc = block.loc;
            context = block.parent.context;
            filePath = path.join(context, loc).replace(process.env.PWD, "");
            fileMap[filePath] = chunk.files;
          }
        }
      });
      out = JSON.stringify(fileMap);
      console.log("[fileMap output]", this.options.output);
      fs.writeFile(this.options.output, out);
      cb();
    })
  }
}
