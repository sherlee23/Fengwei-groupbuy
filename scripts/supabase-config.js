const supabaseConfig = {
    url: 'https://edfnhhthztskuuosuasw.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZm5oaHRoenRza3V1b3N1YXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTYxMTYsImV4cCI6MjA2NTU3MjExNn0.O3g2gjvsWagmWgmzoeJA8mPampvLYJr-KgqVwXsKoAo',
    
    // Lazy initialize the client
    _client: null,
    getClient: function() {
        if (!this._client) {
            this._client = window.supabase.createClient(this.url, this.anonKey);
        }
        return this._client;
    },

    uploadPaymentProof: async function(file, orderId) {
        if (!file) return '';
        
        const client = this.getClient();
        const fileExt = file.name.split('.').pop();
        
        // Correct Path: 'proofs/' folder inside the 'payment-proofs' bucket.
        const fileName = `proofs/${orderId}.${fileExt}`;

        const { error } = await client.storage
            .from('payment-proofs') // Correct Bucket
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: file.type || 'image/jpeg'
            });

        if (error) {
            // A more detailed error log for debugging
            console.error('Supabase Upload Error:', {
                message: error.message,
                status: error.status,
                details: error.error
            });
            throw new Error('付款凭证上传失败，请重试或联系管理员。');
        }

        const { data } = client.storage.from('payment-proofs').getPublicUrl(fileName);
        return data.publicUrl;
    }
};

// Make it globally available
window.supabaseConfig = supabaseConfig;
