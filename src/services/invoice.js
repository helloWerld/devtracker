const apiKey = 'sk_jEMVtUWQCIC7kkVq8X3p4YfaT3Of2B5i';

export const generateNewInvoice = async (invoiceData) => {
  try {
    console.log('generating invoice with invoice data: ', invoiceData)
    const response = await fetch('https://cors-anywhere.herokuapp.com/https://invoice-generator.com', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(invoiceData),
    }, {mode:'no-cors'})

    if (response.ok) {
      const invoiceUrl = await response.text()
      //setInvoiceUrl(invoiceUrl)
      console.log('Invoice generated:', invoiceUrl)
    } else {
      throw new Error('Error generating invoice:', response.statusText)
    }
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
