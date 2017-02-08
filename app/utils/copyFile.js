import fs from 'fs'
import saveTo from 'save-to'
// import asyncBusboy from 'async-busboy'

export default function copyFile(path, filename) {
  const stream = fs.createReadStream(path)

  saveTo(stream, `./public/uploads/${filename}`, (err, dest) => {
    if (err) {
      console.log('err', err)
    }else {
      console.log('destination', dest)
    }
  } )
}

// async function(ctx, next) {
//   const {files, fields} = await asyncBusboy(ctx.req);
//
//   // Make some validation on the fields before upload to S3
//   if ( checkFiles(fields) ) {
//     files.map(uploadFilesToS3)
//   } else {
//     return 'error';
//   }
// }
