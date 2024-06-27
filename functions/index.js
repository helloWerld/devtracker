// const functions = require('firebase-functions')
// const admin = require('firebase-admin')
// const { Storage } = require('@google-cloud/storage')
// const https = require('https')
// const fs = require('fs')
// const path = require('path')
// const os = require('os')

// admin.initializeApp()
// const storage = new Storage()
// const bucket = storage.bucket('your-bucket-name') // Replace with your Firebase Storage bucket name

// exports.generateInvoice = functions.https.onRequest(async (req, res) => {
//   try {
//     if (req.method !== 'POST') {
//       return res.status(405).json({ error: 'Method Not Allowed' })
//     }

//     const invoice = req.body
//     const filename = 'invoice.pdf'

//     const postData = JSON.stringify(invoice)
//     const options = {
//       hostname: 'invoice-generator.com',
//       port: 443,
//       path: '/',
//       method: 'POST',
//       headers: {
//         Authorization: 'Bearer replace_this_with_api_key',
//         'Content-Type': 'application/json',
//         'Content-Length': Buffer.byteLength(postData),
//       },
//     }

//     const tempFilePath = path.join(os.tmpdir(), filename)
//     const file = fs.createWriteStream(tempFilePath)

//     const reqApi = https.request(options, (resApi) => {
//       resApi
//         .on('data', (chunk) => {
//           file.write(chunk)
//         })
//         .on('end', () => {
//           file.end()

//           // Upload file to Firebase Storage
//           bucket
//             .upload(tempFilePath, {
//               destination: `invoices/${filename}`,
//               metadata: {
//                 contentType: 'application/pdf',
//               },
//             })
//             .then((uploadedFile) => {
//               fs.unlinkSync(tempFilePath) // Delete the temporary file

//               // Get the downloadable URL of the uploaded file
//               const downloadUrl = uploadedFile[0].metadata.mediaLink

//               // Respond with success message and download URL
//               res.status(200).json({
//                 message: `Invoice ${filename} generated and saved.`,
//                 downloadUrl,
//               })
//             })
//             .catch((error) => {
//               console.error('Error uploading invoice:', error)
//               res
//                 .status(500)
//                 .json({ error: 'Failed to generate and save invoice.' })
//             })
//         })
//     })

//     reqApi.write(postData)
//     reqApi.end()

//     reqApi.on('error', (error) => {
//       console.error('Request error:', error)
//       res.status(500).json({ error: 'Failed to generate invoice.' })
//     })
//   } catch (error) {
//     console.error('Function error:', error)
//     res.status(500).json({ error: 'Unexpected error occurred.' })
//   }
// })
