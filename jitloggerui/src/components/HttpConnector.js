class HttpConnector{  
    
    get(url) {                         
              return new Promise((resolve, reject) => {
                     return fetch(url,
                       { 
                         method: "GET",                         
                        })
                        .then(result => {                         
                               if (result.status >= 200 && result.status < 300) {

                                 //Examine the text in the response
                                 if (result.status === 200) {                                   
                                   const contentType = result.headers.get('content-type')
                                   let responsePromise
                                   if (contentType && contentType.indexOf('application/json') !== -1) {                                    
                                     responsePromise = result.json()
                                   } else {
                                     responsePromise = result.text()
                                   }
                                 
                                   responsePromise
                                     .then(data => {
                                       resolve(data)
                                     })
                                     .catch(error => {
                                       console.log(error)
                                       resolve(true)
                                     })
                                 } else {
                                   resolve(result)
                                 }
                               } else {
                                 reject(result)
                               }
                             })
                             .catch(err => {
                               console.warn(err)
                             })
                   })  
    }
  
    post(url, data = {}) {
      
        return new Promise((resolve, reject) => {
  
          return fetch(url,
            {
              method: "POST", 
              headers: {                
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }).then(result => {
              if (result.status >= 200 && result.status < 300) {
                // Examine the text in the response
                const contentType = result.headers.get('content-type')
                let responsePromise
                if (contentType && contentType.indexOf('application/json') !== -1) {
                  responsePromise = result.json()
                } else {
                  responsePromise = result.text()
                }
    
                responsePromise
                  .then(data => {
                    resolve(data)
                  })
                  .catch(error => {
                    console.log(error)
                    resolve(true)
                  })
              } else {
                result
                  .json()
                  .then(data => {
                    reject({
                      status: result.status,
                      code: data.error_code,
                      message: data.message
                    })
                  })
                  .catch(() => {
                    return reject(false)
                  })
              }
            })
            .catch(error => console.warn(error))
        
      }  
  )};
    
    put(url, data = {}) {
       
        return new Promise((resolve, reject) => {
          return fetch(url, 
            {
              method: "PUT", 
              headers: 
              {
                
                "Content-Type": "application/json"
              },
              body: JSON.stringify(data)
            }).then(result => {
              if (result.status >= 200 && result.status < 300) {
                // Examine the text in the response
                result
                  .json()
                  .then(data => {
                    resolve(data)
                  })
                  .catch(error => {
                    console.log(error)
                    resolve(true)
                  })
              } else {
                result
                  .json()
                  .then(data => {
                    reject({
                      status: result.status,
                      code: data.error_code,
                      message: data.message
                    })
                  })
                  .catch(() => {
                    return reject(false)
                  })
              }
            })
            .catch(error => console.warn(error))
        })
   
  };
    
    
    delete(url,data = {}) {
     
        return new Promise((resolve, reject) => {
          return fetch(url,
            {
              method: "Delete", 
            
              body: JSON.stringify(data)
            }).then(result => {
              if (result.status >= 200 && result.status < 300) {
                // Examine the text in the response
                result
                  .json()
                  .then(data => {
                    resolve(data)
                  })
                  .catch(() => {
                    resolve(true)
                  })
              } else {
                result
                  .json()
                  .then(data => {
                    reject({
                      status: result.status,
                      code: data.error_code,
                      message: data.message
                    })
                  })
                  .catch(() => {
                    return reject(false)
                  })
              }
            })
            .catch(error => console.warn(error))
        })
      
    };
    }
  
  export default new HttpConnector();