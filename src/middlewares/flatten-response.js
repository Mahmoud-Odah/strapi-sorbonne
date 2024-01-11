function flattenArray(obj) {
  console.log('obj :>> ', obj);
    return obj.map((e) => flatten(e)).filter((item) => item !== null);
  }
  
  function flattenData(obj) {
    return flatten(obj.data);
  }
  
  function flattenAttrs(obj) {
    let attrs = {};
    if (obj.attributes.publishedAt === null) {
      return null;
    } else {
      for (var key in obj.attributes) {
        attrs[key] = flatten(obj.attributes[key]);
       
        //Format Image response to string instead of object
        const mimeType = attrs[key]?.mime;
        if (
          attrs[key]?.url &&
          (mimeType?.includes("image") || mimeType?.includes("pdf"))
        ) {
          attrs[key] = attrs[key]?.url;
        }
      }
    }
    return {
      id: obj.id,
      ...attrs,
    };
  }
  
  function flatten(obj) {
    if (Array.isArray(obj)) {
      return flattenArray(obj);
    }
    if (obj && obj.data) {
      return flattenData(obj);
    }
    if (obj && obj.attributes) {
      return flattenAttrs(obj);
    }
    for (var k in obj) {
      if (typeof obj[k] == "object") {
    if (
          obj[k]?.data?.attributes?.url &&
          obj[k]?.data?.attributes?.mime?.includes("image")

          )
          {

            obj[k] = obj[k]?.url;
          }

        else obj[k] = flatten(obj[k]);
      }
    }
    if (obj && obj.data === null) {
      return null;
    }
    return obj;
  }
  
  async function respond(ctx, next) {
    await next();
    if (!ctx.url.startsWith("/api")) {
      return;
    }
    ctx.response.body = flatten(ctx.response.body.data);
  }
  
  module.exports = () => respond;
  