const supabaseConfig = {
    url: 'https://edfnhhthztskuuosuasw.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkZm5oaHRoenRza3V1b3N1YXN3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk5OTYxMTYsImV4cCI6MjA2NTU3MjExNn0.O3g2gjvsWagmWgmzoeJA8mPampvLYJr-KgqVwXsKoAo',
    
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
        const fileName = `proofs/${orderId}.${fileExt}`;

        const { error } = await client.storage
            .from('payment-proofs')
            .upload(fileName, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: file.type || 'image/jpeg'
            });

        if (error && !error.message.includes('already exists')) {
            console.error('Upload Error:', error);
            throw new Error('Payment proof upload failed.');
        }

        const { data } = client.storage.from('payment-proofs').getPublicUrl(fileName);
        return data.publicUrl;
    }
};

window.supabaseConfig = supabaseConfig;
