// HELPER OBJECT - FIXED
const PhoneFormatter = {
    format: function(value) {
        // Basic formatter for Malaysian numbers
        let cleaned = value.replace(/\D/g, '');
        if (cleaned.startsWith('60')) {
            cleaned = cleaned.substring(2);
        }
        if (cleaned.startsWith('1')) {
            cleaned = '0' + cleaned;
        }
        return cleaned;
    }
};

class FoodOrderApp {
    constructor() {
        this.cart = new Map();
        this.products = [];
        this.validator = new FormValidator();
        this.currentCategory = 'all';

        this.initializeApp();
    }

    async initializeApp() {
        this.showLoading(true);
        await this.loadProducts();
        this.renderCategories();
        this.setupEventListeners();
        this.renderProducts();
        this.updateCartSummary();
        this.showLoading(false);
        this.showToast('应用加载成功', 'success');
    }

    async loadProducts() {
        // CORRECTED: Added image properties to all products
        this.products = [
            { id: 1, name: '原味烤肠', price: 28, image: 'IMG_3859.jpeg', category: '烤肠系列', emoji: '🌭', stock: 45, minStock: 10 },
            { id: 2, name: '烟熏蜜汁烤肠', price: 28, image: 'IMG_3864.jpeg', category: '烤肠系列', emoji: '🌭', stock: 38, minStock: 10 },
            { id: 3, name: '法式香草烤肠', price: 28, image: 'IMG_3863.jpeg', category: '烤肠系列', emoji: '🌭', stock: 52, minStock: 10 },
            { id: 4, name: '黑胡椒烤肠', price: 28, image: 'IMG_3860.jpeg', category: '烤肠系列', emoji: '🌭', stock: 8, minStock: 10 },
            { id: 5, name: '孜然脆骨烤肠', price: 28, image: 'IMG_3862.jpeg', category: '烤肠系列', emoji: '🌭', stock: 23, minStock: 10 },
            { id: 6, name: '芝士玉米烤肠', price: 28, image: 'IMG_3861.jpeg', category: '烤肠系列', emoji: '🌭', stock: 41, minStock: 10 },
            { id: 7, name: '原味虾肠', price: 33, image: 'IMG_3853.jpeg', category: '虾肠系列', emoji: '🦐', stock: 30, minStock: 8 },
            { id: 8, name: '辣味虾肠', price: 33, image: 'IMG_3854.jpeg', category: '虾肠系列', emoji: '🦐', stock: 27, minStock: 8 },
            { id: 9, name: '原味虾饼', price: 28, image: 'IMG_3873.jpeg', category: '虾肠系列', emoji: '🍤', stock: 19, minStock: 8 },
            { id: 10, name: '玛格丽特披萨', price: 25, image: 'IMG_3841.jpeg', category: '披萨系列', emoji: '🍕', stock: 15, minStock: 5 },
            { id: 11, name: '黑椒牛肉披萨', price: 25, image: 'IMG_3839.jpeg', category: '披萨系列', emoji: '🍕', stock: 12, minStock: 5 },
            { id: 12, name: '奥尔良鸡肉披萨', price: 25, image: 'IMG_3840.jpeg', category: '披萨系列', emoji: '🍕', stock: 18, minStock: 5 },
            { id: 13, name: '双料榴莲披萨', price: 40, image: 'IMG_3852.jpeg', category: '披萨系列', emoji: '🍕', stock: 3, minStock: 3 },
            { id: 14, name: '鲜肉小笼汤包', price: 12, image: 'IMG_3874.jpeg', category: '小笼汤包系列', emoji: '🥟', stock: 60, minStock: 15 },
            { id: 15, name: '菌菇小笼汤包', price: 12, image: 'IMG_3875.jpeg', category: '小笼汤包系列', emoji: '🥟', stock: 45, minStock: 15 },
            { id: 16, name: '黑松露小笼汤包', price: 12, image: 'IMG_3876.jpeg', category: '小笼汤包系列', emoji: '🥟', stock: 20, minStock: 10 },
            { id: 17, name: '黑猪肉酥饼', price: 55, image: 'IMG_3837.jpeg', category: '酥饼系列', emoji: '🥮', stock: 8, minStock: 5 },
            { id: 18, name: '安格斯牛肉酥饼', price: 55, image: 'IMG_3838.jpeg', category: '酥饼系列', emoji: '🥮', stock: 12, minStock: 5 },
            { id: 19, name: '原味鸡排', price: 20, image: 'IMG_3835.jpeg', category: '鸡排系列', emoji: '🍗', stock: 25, minStock: 8 },
            { id: 20, name: '奥尔良鸡排', price: 20, image: 'IMG_3836.jpeg', category: '鸡排系列', emoji: '🍗', stock: 22, minStock: 8 },
            { id: 21, name: '奥尔良鸡翅', price: 25, image: 'IMG_3865.jpeg', category: '鸡翅系列', emoji: '🍗', stock: 35, minStock: 10 },
            { id: 22, name: '青花椒鸡翅', price: 25, image: 'IMG_3866.jpeg', category: '鸡翅系列', emoji: '🍗', stock: 28, minStock: 10 },
            { id: 23, name: '黑猪三丁纸皮烧卖', price: 15, image: 'IMG_3843.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 40, minStock: 12 },
            { id: 24, name: '黑椒牛肉纸皮烧卖', price: 15, image: 'IMG_3842.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 5, minStock: 12 },
            { id: 25, name: '黑猪梅菜干纸皮烧卖', price: 15, image: 'IMG_3844.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 32, minStock: 12 },
            { id: 26, name: '三丁芝士纸皮烧卖', price: 15, image: 'IMG_3845.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 0, minStock: 12 },
            { id: 27, name: '乌米腊味纸皮烧卖', price: 15, image: 'IMG_3846.jpeg', category: '纸皮烧卖系列', emoji: '🥟', stock: 18, minStock: 12 }
        ];
    }

    renderCategories() {
        const nav = document.getElementById('categoryNav');
        const categories = ['all', ...new Set(this.products.map(p => p.category))];
        const linksHtml = categories.map(cat => {
            if (cat === 'all') {
                return `<a href="#all" class="category-link active" data-category="all">全部</a>`;
            }
            const product = this.products.find(p => p.category === cat);
            return `<a href="#${cat}" class="category-link" data-category="${cat}">${product.emoji} ${cat}</a>`;
        }).join('');
        nav.innerHTML = `<div class="category-links">${linksHtml}</div>`;
        
        nav.querySelectorAll('.category-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleCategoryChange(link.dataset.category);
            });
        });
    }
    
    setupEventListeners() {
        document.getElementById('mainForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        document.getElementById('deliveryMethod').addEventListener('change', (e) => {
            const isLalamove = e.target.value === 'lalamove';
            document.getElementById('deliveryAddressGroup').style.display = isLalamove ? 'block' : 'none';
            document.getElementById('selfPickupAddress').style.display = e.target.value === 'self-pickup' ? 'block' : 'none';
        });
        
        document.getElementById('paymentProof').addEventListener('change', this.handleFileUpload.bind(this));
        document.getElementById('customerPhone').addEventListener('input', (e) => {
            e.target.value = PhoneFormatter.format(e.target.value);
        });

        document.getElementById('cancelOrder').addEventListener('click', () => this.hideDialog('confirmationDialog'));
        document.getElementById('confirmOrder').addEventListener('click', () => this.submitOrder());
        document.getElementById('closeSuccess').addEventListener('click', () => {
            this.hideDialog('successDialog');
            this.resetForm();
        });
        
        document.getElementById('showExportBtn').addEventListener('click', () => {
            const panel = document.getElementById('adminPanel');
            panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
        });
        document.getElementById('realExportBtn').addEventListener('click', () => {
            this.handleAdminExport(document.getElementById('adminPassword').value);
        });
    }
    
    handleCategoryChange(category) {
        this.currentCategory = category;
        document.querySelectorAll('.category-link').forEach(link => {
            link.classList.toggle('active', link.dataset.category === category);
        });
        this.renderProducts();
    }

    renderProducts() {
        const productList = document.getElementById('productList');
        const filtered = this.currentCategory === 'all' 
            ? this.products 
            : this.products.filter(p => p.category === this.currentCategory);
        
        productList.innerHTML = filtered.map(p => this.renderProduct(p)).join('');
        this.setupQuantityControls();
    }
    
    // CORRECTED: Added the image tag to display the product image
    renderProduct(product) {
        const quantity = this.cart.get(product.id) || 0;
        const isOutOfStock = product.stock === 0;
        return `
            <div class="product ${isOutOfStock ? 'out-of-stock' : ''}" data-product-id="${product.id}">
                <div class="product-image-container">
                    <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
                </div>
                <div class="product-name">${product.emoji} ${product.name}</div>
                <div class="product-price">RM${product.price.toFixed(2)}</div>
                <div class="stock-info">库存: ${isOutOfStock ? '已售完' : `${product.stock}件`}</div>
                <div class="quantity-control">
                    <button class="quantity-btn" data-action="decrease" ${quantity === 0 || isOutOfStock ? 'disabled' : ''}>-</button>
                    <input type="number" class="quantity-input" value="${quantity}" min="0" max="${product.stock}" ${isOutOfStock ? 'disabled' : ''}>
                    <button class="quantity-btn" data-action="increase" ${quantity >= product.stock || isOutOfStock ? 'disabled' : ''}>+</button>
                </div>
            </div>`;
    }

    setupQuantityControls() {
        document.querySelectorAll('.product').forEach(element => {
            this.setupQuantityControlsForElement(element);
        });
    }

    // NEW HELPER FUNCTION: To set up listeners on one specific element
    setupQuantityControlsForElement(element) {
        const productId = parseInt(element.dataset.productId);
        const control = element.querySelector('.quantity-control');
        
        const increaseBtn = control.querySelector('.quantity-btn[data-action="increase"]');
        const decreaseBtn = control.querySelector('.quantity-btn[data-action="decrease"]');
        const quantityInput = control.querySelector('.quantity-input');
        
        // Use a function reference that can be removed and re-added if needed
        const increaseHandler = () => this.updateQuantity(productId, 'increase');
        const decreaseHandler = () => this.updateQuantity(productId, 'decrease');
        const inputHandler = (e) => {
            const value = parseInt(e.target.value) || 0;
            this.setQuantity(productId, value);
        };
        
        // Remove old listeners to prevent duplicates (important for re-rendering)
        increaseBtn.replaceWith(increaseBtn.cloneNode(true));
        decreaseBtn.replaceWith(decreaseBtn.cloneNode(true));
        quantityInput.replaceWith(quantityInput.cloneNode(true));

        // Add new listeners
        element.querySelector('.quantity-btn[data-action="increase"]').addEventListener('click', increaseHandler);
        element.querySelector('.quantity-btn[data-action="decrease"]').addEventListener('click', decreaseHandler);
        element.querySelector('.quantity-input').addEventListener('change', inputHandler);
    }

    updateQuantity(productId, action) {
        let quantity = this.cart.get(productId) || 0;
        const product = this.products.find(p => p.id === productId);
        if (action === 'increase') {
            if (quantity < product.stock) quantity++;
        } else if (action === 'decrease') {
            if (quantity > 0) quantity--;
        }
        this.setQuantity(productId, quantity);
    }
    
    // CORRECTED: Efficiently re-renders only the changed product
    setQuantity(productId, quantity) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        if (quantity > product.stock) {
            quantity = product.stock;
            this.showToast(`库存不足，${product.name}最多只能购买${product.stock}件`, 'warning');
        }
        
        if (quantity > 0) {
            this.cart.set(productId, quantity);
        } else {
            this.cart.delete(productId);
        }
        
        // Re-render only the specific product that was changed
        const productElement = document.querySelector(`.product[data-product-id="${productId}"]`);
        if (productElement) {
            const newElementHTML = this.renderProduct(product);
            productElement.outerHTML = newElementHTML;
            // The new element needs its event listeners re-attached
            const newProductElement = document.querySelector(`.product[data-product-id="${productId}"]`);
            this.setupQuantityControlsForElement(newProductElement);
        }

        this.updateCartSummary();
    }

    updateCartSummary() {
        let total = 0;
        let count = 0;
        this.cart.forEach((quantity, productId) => {
            const product = this.products.find(p => p.id === productId);
            if (product) {
                total += product.price * quantity;
                count += quantity;
            }
        });
        document.getElementById('totalAmount').textContent = `总计: RM${total.toFixed(2)}`;
        document.getElementById('itemCount').textContent = count;
        document.getElementById('cartSummary').style.display = count > 0 ? 'block' : 'none';
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        const fileNameSpan = document.querySelector('.file-name');
        fileNameSpan.textContent = file ? file.name : '';
    }

    async handleFormSubmit() {
        if (this.cart.size === 0) {
            this.showToast('请至少选择一件商品', 'warning');
            return;
        }

        const formData = this.collectFormData();
        if (!this.validator.validateForm(formData)) {
            this.validator.showAllErrors();
            this.showToast('请检查表单，有未填写的必填项', 'error');
            return;
        }
        this.showConfirmationDialog(formData);
    }

    collectFormData() {
        const form = document.getElementById('mainForm');
        return {
            agreeTerms: form.agreeTerms.checked,
            customerName: form.customerName.value.trim(),
            customerPhone: form.customerPhone.value.trim(),
            deliveryMethod: form.deliveryMethod.value,
            deliveryAddress: form.deliveryAddress.value.trim(),
            specialRequests: form.specialRequests.value.trim(),
            paymentProofFile: form.paymentProof.files[0],
            cart: Array.from(this.cart.entries()).map(([id, quantity]) => {
                const product = this.products.find(p => p.id === id);
                return { name: product.name, quantity, price: product.price };
            })
        };
    }
    
    showConfirmationDialog(formData) {
        const summary = document.getElementById('orderSummary');
        let total = formData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        summary.innerHTML = `
            <p><strong>姓名:</strong> ${formData.customerName}</p>
            <p><strong>电话:</strong> ${formData.customerPhone}</p>
            <p><strong>取货方式:</strong> ${formData.deliveryMethod === 'self-pickup' ? '自取' : 'Lalamove'}</p>
            ${formData.deliveryMethod === 'lalamove' ? `<p><strong>地址:</strong> ${formData.deliveryAddress}</p>` : ''}
            <hr>
            <h4>订单商品:</h4>
            <ul>${formData.cart.map(item => `<li>${item.name} x ${item.quantity}</li>`).join('')}</ul>
            <h4>总计: RM${total.toFixed(2)}</h4>
        `;
        this.pendingOrderData = formData;
        this.showDialog('confirmationDialog');
    }

    async submitOrder() {
        this.hideDialog('confirmationDialog');
        this.showLoading(true);
        try {
            const orderData = this.pendingOrderData;
            const orderNumber = this.generateOrderNumber();
            const paymentProofUrl = await window.supabaseConfig.uploadPaymentProof(orderData.paymentProofFile, orderNumber);
            
            const client = window.supabaseConfig.getClient();
            const { error } = await client.from('orders').insert([{
                order_id: orderNumber,
                name: orderData.customerName,
                phone: orderData.customerPhone,
                delivery_method: orderData.deliveryMethod,
                delivery_address: orderData.deliveryAddress,
                remarks: orderData.specialRequests,
                order_items: orderData.cart,
                total_amount: orderData.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                payment_proof_url: paymentProofUrl,
                status: 'pending'
            }]);

            if (error) throw error;
            
            orderData.cart.forEach(item => {
                const product = this.products.find(p => p.name === item.name);
                if (product) product.stock -= item.quantity;
            });

            this.showSuccessDialog(orderNumber);

        } catch (error) {
            console.error('Order submission failed:', error);
            this.showToast(`订单提交失败: ${error.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }
    
    generateOrderNumber() {
        const date = new Date();
        const dateStr = `${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
        const timeStr = Date.now().toString().slice(-6);
        return `FW${dateStr}${timeStr}`;
    }

    showSuccessDialog(orderNumber) {
        document.getElementById('orderNumber').textContent = orderNumber;
        this.showDialog('successDialog');
    }

    resetForm() {
        document.getElementById('mainForm').reset();
        this.cart.clear();
        this.renderProducts();
        this.updateCartSummary();
        document.querySelector('.file-name').textContent = '';
        document.getElementById('deliveryAddressGroup').style.display = 'none';
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    showDialog(id) { document.getElementById(id).classList.add('show'); }
    hideDialog(id) { document.getElementById(id).classList.remove('show'); }
    showLoading(show) { document.getElementById('loadingOverlay').style.display = show ? 'flex' : 'none'; }
    
    showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.innerHTML = `<span class="toast-message">${message}</span>`;
        toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    }

    async handleAdminExport(password) {
        const ADMIN_PASSWORD = 'fengweipaiadmin';
        if (password !== ADMIN_PASSWORD) {
            this.showToast('管理员密码错误', 'error');
            return;
        }
        this.showLoading(true);
        try {
            const { data: orders, error } = await window.supabaseConfig.getClient()
                .from('orders').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            
            const wsData = [
                ['订单号', '姓名', '电话', '取货方式', '地址', '备注', '总金额', '状态', '下单时间', '支付凭证', '商品']
            ];
            orders.forEach(o => {
                wsData.push([
                    o.order_id, o.name, o.phone, o.delivery_method, o.delivery_address, o.remarks, 
                    o.total_amount, o.status, new Date(o.created_at).toLocaleString(), o.payment_proof_url,
                    o.order_items.map(i => `${i.name}x${i.quantity}`).join('; ')
                ]);
            });

            const ws = XLSX.utils.aoa_to_sheet(wsData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, '订单数据');
            XLSX.writeFile(wb, `锋味派订单_${new Date().toISOString().slice(0, 10)}.xlsx`);
            this.showToast('导出成功', 'success');
        } catch (err) {
            this.showToast(`导出失败: ${err.message}`, 'error');
        } finally {
            this.showLoading(false);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.app = new FoodOrderApp();
});
