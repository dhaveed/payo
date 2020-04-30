

module.exports = field => ({$cond : [ {$isArray : `$${field}`}, `$${field}`, [] ]})
