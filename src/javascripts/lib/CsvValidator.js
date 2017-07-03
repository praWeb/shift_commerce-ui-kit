import Lazy from "lazy.js"

export default class CsvValidator {
  constructor(csvString) {
    this.csvString = csvString
  }

  validate() {
    let lazyCsv = Lazy(this.csvString).split("\n")

    if (lazyCsv.drop(1).isEmpty()) {
      return "missing header or data"
    }
    let header = lazyCsv.take(1).toArray()[0].split(/\s*,\s*/)
    let validationErrors = this.validateHeader(header)
    if (validationErrors.length > 0) {
      return validationErrors
    }

    let headerData = this.createHeaderData(header)

    let error = lazyCsv
      .drop(1) // skip header
      .map((line, idx) => { return this.validateData(headerData, line, idx + 2) }) // map line to validation error if any
      .dropWhile((err) => { return err.length === 0 }) // drop valid lines
      .take(1) // stop on first invalid line
      .toArray()[0]

    return error || ""
  }

  validateHeader(header) {
    const standardHeader = ["sku", "stock_location_reference", "stock_allocated", "stock_on_hand"]
    let standardHeaderSet = new Set(standardHeader)
    let headerSet = new Set(header)
    let missing = standardHeader.filter(function(x) { return !headerSet.has(x) })
    let unexpected = header.filter(function(x) { return !standardHeaderSet.has(x) })
    let error_messages = []
    if (missing.length > 0) {
      error_messages.push("missing header(s): " + missing.join())
    }
    if (unexpected.length > 0) {
      error_messages.push("unexpected header(s): " + unexpected.join())
    }
    return(error_messages.join())
  }

  createHeaderData(header) {
    let data = { columnsCount: header.length }

    for (var i = 0; i < header.length; i++) {
      switch ( header[i] ) {
        case "sku":
          data.skuIndex = i
          break
        case "stock_location_reference":
          data.stockLocationReferenceIndex = i
          break
        case "stock_allocated":
          data.stockAllocatedIndex = i
          break
        case "stock_on_hand":
          data.stockOnHandIndex = i
          break
      }
    }

    return data
  }

  validateData(headerData, line, line_num) {
    let error_messages = []

    let fields = line.split(",").map((field)=>{ return field.trim() })
    // skip empty line
    if (fields.length === 1 && fields[0].length === 0) {
      return ""
    }

    if (fields.length !== headerData.columnsCount) {
      return "line " + line_num + ": columns count doesn't match header"
    }

    error_messages = this.validateLine(headerData, fields, line_num)

    return (error_messages.join())
  }

  validateLine(headerData, fields, line_num) {
    let error_messages = []
    // validate fields according to header data
    this.validateSku(fields[headerData.skuIndex], error_messages, line_num)
    this.validateStockLocationReference(fields[headerData.stockLocationReferenceIndex], error_messages, line_num)
    this.validateStockAllocated(fields[headerData.stockAllocatedIndex], error_messages, line_num)
    this.validateStockOnHand(fields[headerData.stockOnHandIndex], error_messages, line_num)
    this.validateStockOnHandAndStockAllocatedPresence(fields[headerData.stockAllocatedIndex],
                                                      fields[headerData.stockOnHandIndex],
                                                      error_messages,
                                                      line_num)
    return(error_messages)
  }

  validateSku(sku_field, error_messages, line_num) {
    if (sku_field.length === 0) {
      error_messages.push("line " + line_num + ": missed sku")
    }
  }

  validateStockLocationReference(stock_location_reference, error_messages, line_num) {
    if (stock_location_reference.length === 0) {
      error_messages.push("line " + line_num + ": missed stock_location_reference")
    }
  }

  validateStockAllocated(stock_allocated_field, error_messages, line_num) {
    if (Number(stock_allocated_field) < 0) {
      error_messages.push("line " + line_num + ": negative stock_allocated")
    }
  }

  validateStockOnHand(stock_on_hand_field, error_messages, line_num) {
    if (Number(stock_on_hand_field) < 0) {
      error_messages.push("line " + line_num + ": negative stock_on_hand_field")
    }
  }

  validateStockOnHandAndStockAllocatedPresence(stock_allocated_field, stock_on_hand_field, error_messages, line_num) {
    if (stock_allocated_field.length === 0 && stock_on_hand_field.length === 0) {
      error_messages.push("line " + line_num + ": missed both stock_allocated and stock_on_hand")
    }
  }
}
