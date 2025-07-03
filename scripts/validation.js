class FormValidator {
    constructor() {
        this.errors = {};
    }

    validateForm(formData) {
        this.errors = {};
        const phoneRegex = /^(\+?6?01)[0-46-9]-?[0-9]{7,8}$/;

        if (!formData.agreeTerms) this.errors.agreeTerms = '请同意条款以继续';
        if (!formData.customerName) this.errors.customerName = '请输入有效的姓名';
        if (!formData.customerPhone || !phoneRegex.test(formData.customerPhone)) this.errors.customerPhone = '请输入有效的马来西亚电话号码';
        if (!formData.deliveryMethod) this.errors.deliveryMethod = '请选择取货方式';
        if (formData.deliveryMethod === 'lalamove' && !formData.deliveryAddress) this.errors.deliveryAddress = 'Lalamove送货需要提供配送地址';
        if (!formData.paymentMethod) this.errors.paymentMethod = '请选择付款方式';
        if (!formData.paymentProofFile) this.errors.paymentProof = '请上传付款凭证';
        
        return Object.keys(this.errors).length === 0;
    }

    showAllErrors() {
        // Clear previous errors from all potential error containers
        document.querySelectorAll('.form-group, .disclaimer-box').forEach(el => {
            el.classList.remove('error');
            const errorMsgEl = el.querySelector('.error-message');
            if (errorMsgEl) errorMsgEl.textContent = '';
        });

        // Show new errors
        for (const fieldName in this.errors) {
            const errorMsg = this.errors[fieldName];
            let element;
            
            if (fieldName === 'agreeTerms') {
                element = document.getElementById('disclaimerBox');
            } else if (fieldName === 'paymentProof') {
                element = document.getElementById('paymentProofSection');
            } else {
                element = document.getElementById(fieldName)?.closest('.form-group');
            }
            
            if (element) {
                element.classList.add('error');
                const errorMsgEl = element.querySelector('.error-message');
                if (errorMsgEl) {
                    errorMsgEl.textContent = errorMsg;
                }
            }
        }

        // Scroll to the first error element
        const firstErrorKey = Object.keys(this.errors)[0];
        if (firstErrorKey) {
            let firstErrorElement;
            if (firstErrorKey === 'agreeTerms') {
                firstErrorElement = document.getElementById('disclaimerBox');
            } else if (firstErrorKey === 'paymentProof') {
                firstErrorElement = document.getElementById('paymentProofSection');
            } else {
                 firstErrorElement = document.getElementById(firstErrorKey);
            }
            firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}
