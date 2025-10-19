const form = document.getElementById('cmhEmailForm');
const successMessage = document.getElementById('cmhSuccessMessage');

if (form) {
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('cmh-name').value;
        const email = document.getElementById('cmh-email').value;
        const scriptURL = 'https://script.google.com/macros/s/AKfycbwVH1fU_hBU6xBS2lCz8W81YxZZLHB_bOUCiMOkjGa9294obpHfwO4jaO3BNQi9GpYD/exec';
        
        try {
            await fetch(scriptURL, {
                method: 'POST',
                body: JSON.stringify({ 
                    name: name, 
                    email: email, 
                    timestamp: new Date().toISOString(),
                    source: 'Creative Mind Habits - Prompt Vault'
                })
            });
            
            successMessage.style.display = 'block';
            form.reset();
            
        } catch (error) {
            alert('Something went wrong. Please email us directly.');
        }
    });
}