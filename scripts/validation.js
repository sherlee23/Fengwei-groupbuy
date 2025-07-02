class FormValidator {
    constructor() {
        this.errors = {};
    }

    validateForm(formData) {
        this.errors = {};

        if (!formData.agreeTerms) {
            this.errors.agreeTerms = '请同意条款以继续';
        }
        if (!formData.customerName || formData.customerName.length < 2) {
            this.errors.customerName = '请输入有效的姓名';
        }
        // A robust regex for Malaysian numbers
        const phoneRegex = /^(?:\+?6?01)[0-46-9]-?[0-9]{7,8}$/;
        if (!formData.customerPhone || !phoneRegex.test(formData.customerPhone.replace(/[\s-]/g, ''))) {
            this.errors.customerPhone = '请输入有效的马来西亚电话号码';
        }
        if (!formData.deliveryMethod) {
            this.errors.deliveryMethod = '请选择取货方式';
        }
        if (formData.deliveryMethod === 'lalamove' && !formData.deliveryAddress) {
            this.errors.deliveryAddress = 'Lalamove送货需要提供配送地址';
        }
        if (!formData.paymentProofFile) {
            this.errors.paymentProof = '请上传付款凭证';
        }
        return Object.keys(this.errors).length === 0;
    }

    showAllErrors() {
        // Clear previous errors first
        document.querySelectorAll('.form-group.error, .disclaimer-box.error').forEach(el => {
            el.classList.remove('error');
            const errorMsgEl = el.querySelector('.error-message');
            if (errorMsgEl) errorMsgEl.textContent = ''; // Clear old message
        });

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
    }
}
