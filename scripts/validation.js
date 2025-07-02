class FormValidator {
    constructor() {
        this.errors = {};
    }

    validateForm(formData) {
        this.errors = {};

        // Agreement
        if (!formData.agreeTerms) {
            this.errors.agreeTerms = '请同意条款以继续';
        }

        // Name
        if (!formData.customerName || formData.customerName.length < 2) {
            this.errors.customerName = '请输入有效的姓名';
        }

        // Phone
        const phoneRegex = /^(\+?6?01)[0-46-9]-?[0-9]{7,8}$/;
        if (!formData.customerPhone || !phoneRegex.test(formData.customerPhone.replace(/-/g, ''))) {
            this.errors.customerPhone = '请输入有效的马来西亚电话号码';
        }

        // Delivery Method
        if (!formData.deliveryMethod) {
            this.errors.deliveryMethod = '请选择取货方式';
        } else if (formData.deliveryMethod === 'lalamove' && !formData.deliveryAddress) {
            this.errors.deliveryAddress = 'Lalamove送货需要提供配送地址';
        }

        // Payment Proof
        if (!formData.paymentProofFile) {
            this.errors.paymentProof = '请上传付款凭证';
        } else {
            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
            if (!allowedTypes.includes(formData.paymentProofFile.type)) {
                this.errors.paymentProof = '仅支持JPG, PNG, GIF等图片格式';
            }
            if (formData.paymentProofFile.size > 5 * 1024 * 1024) { // 5MB limit
                this.errors.paymentProof = '文件大小不能超过5MB';
            }
        }

        return Object.keys(this.errors).length === 0;
    }
    
    showAllErrors() {
        // Clear previous errors
        document.querySelectorAll('.form-group.error, .disclaimer-box.error').forEach(el => el.classList.remove('error'));

        Object.keys(this.errors).forEach(fieldName => {
            let element;
            if (fieldName === 'agreeTerms') {
                element = document.getElementById('disclaimerBox');
            } else {
                element = document.getElementById(fieldName)?.closest('.form-group');
            }
            
            if (element) {
                element.classList.add('error');
                const errorMsgEl = element.querySelector('.error-message');
                if (errorMsgEl) {
                    errorMsgEl.textContent = this.errors[fieldName];
                }
            }
        });
    }

    getErrors() {
        return this.errors;
    }
}
