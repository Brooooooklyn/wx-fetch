;(function (self) {
  if (self.fetch && self.fetch.polyfill) return
  self.fetch = function(input, init) {
    return new Promise(function(resolve, reject) {
      var request
      if (Request.prototype.isPrototypeOf(input) && !init) {
        request = input
      } else {
        request = new Request(input, init)
      }

      var wxHeaders = {}

      request.headers.forEach(function(value, name) {
        wxHeaders[name] = value
      })

      wx.request({
        url: request.url,
        header: wxHeaders,
        data: request.body,
        method: request.method,
        success: function(res) {
          resolve(new Response(JSON.stringify(res.data), {
            status: res.statusCode,
            statusText: res.errMsg
          }))
        },
        fail: function(res) {
          resolve(new Response(JSON.stringify(res.data), {
            status: res.statusCode,
            statusText: res.errMsg
          }))
        }
      })
    })
  }
  self.fetch.polyfill = true
})(this)
