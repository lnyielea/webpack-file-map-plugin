import fs from "fs"
import path from "path"
export default class WebpackPluginTest {
  apply(complier) {
    complier.plugin("emit", (compilation, cb) => {
      let out, context;
      const fileMap = {};
      const assets = compilation.assets;
      compilation.chunks.map((chunk) => {
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
      });
      out = JSON.stringify(fileMap);
      assets["fileMap.json"] = {
        source() {
          return out;
        },
        size() {
          return out.length;
        }
      }
      cb();
    })
  }
}
