import fs from "fs"
export default class WebpackFileMapPlugin {
  apply(complier) {
    complier.plugin("emit", (compilation, cb) => {
      let out;
      const fileMap = {};
      compilation.chunks.map((chunk) => {
        let loc;
        chunk.blocks.map((block) => {
          loc = block.loc;
        });
        if(loc) {
          fileMap[loc] = chunk.files;
        }
        // console.log(loc);
        // console.log(chunk.files);
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
