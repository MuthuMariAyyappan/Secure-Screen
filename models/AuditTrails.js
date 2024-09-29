
module.exports = function AuditTrailPlugin(schema,options){
  
    const userField = options?.userField;

    schema.add({createdDate: Date})
    schema.add({createdBy: String})
    schema.add({modifiedDate: Date})
    schema.add({modifiedBy: String})

    schema.pre("save",function(next){
        this.createdBy = this[userField] ?? ""
        this.createdDate = new Date()
        this.modifiedBy = this[userField] ?? ""
        this.modifiedDate = new Date()
        next()
    })

    schema.pre("findOneAndUpdate",{document: true},function(next){
        this.modifiedDate = new Date();
        this.modifiedBy = this[userField] ?? "";
        next()
    })

}