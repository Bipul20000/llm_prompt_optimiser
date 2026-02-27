import styles from '../styles/index.css?inline';

const createVanillaButton = (onClick) => {
    const btn = document.createElement('button');
    btn.className = 'prompt-optimizer-btn';
    const iconSpan = document.createElement('span');
    iconSpan.className = 'prompt-optimizer-icon';
    iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>';
    const textSpan = document.createElement('span');
    textSpan.textContent = 'Optimize Prompt';
    btn.appendChild(iconSpan);
    btn.appendChild(textSpan);
    btn.addEventListener('click', async () => {
        if (btn.disabled) return;
        btn.disabled = true;
        iconSpan.className = 'prompt-optimizer-icon prompt-optimizer-spin';
        iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>';
        textSpan.textContent = 'Optimizing...';
        await onClick();
        btn.disabled = false;
        iconSpan.className = 'prompt-optimizer-icon';
        iconSpan.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>';
        textSpan.textContent = 'Optimize Prompt';
    });
    return btn;
};

const mountButton = (inputElement) => {
    if (document.querySelector('#prompt-optimizer-root')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'prompt-optimizer-root';
    wrapper.style.position = 'fixed';
    wrapper.style.display = 'flex';
    wrapper.style.justifyContent = 'center';
    wrapper.style.zIndex = '999999';

    const shadowRoot = wrapper.attachShadow({ mode: 'open' });

    const styleTag = document.createElement('style');
    styleTag.textContent = styles;
    shadowRoot.appendChild(styleTag);

    const mountPoint = document.createElement('div');
    shadowRoot.appendChild(mountPoint);

    document.body.appendChild(wrapper);

    const updatePosition = () => {
        const el = document.querySelector('.ProseMirror') || document.querySelector('[contenteditable="true"]');
        if (el) {
            wrapper.style.display = 'flex';
            const rect = el.getBoundingClientRect();
            wrapper.style.top = `${rect.top - 40}px`;
            wrapper.style.left = `${rect.left + (rect.width / 2) - 80}px`;
        } else {
            wrapper.style.display = 'none';
        }
    };

    updatePosition();
    setInterval(updatePosition, 100);

    const handleOptimize = async () => {
        const el = document.querySelector('.ProseMirror') || document.querySelector('[contenteditable="true"]');
        if (!el) return;

        const rawText = (el.value !== undefined ? el.value : el.innerText) || '';
        const currentText = rawText.trim();
        if (!currentText) return;

        try {
            const response = await new Promise((resolve, reject) => {
                chrome.runtime.sendMessage(
                    { action: "OPTIMIZE_PROMPT", payload: currentText },
                    (res) => {
                        if (chrome.runtime.lastError) reject(chrome.runtime.lastError);
                        else if (res && res.error) reject(new Error(res.error));
                        else resolve(res);
                    }
                );
            });

            if (response && response.optimized_prompt) {
                el.focus();
                el.textContent = response.optimized_prompt;

                el.dispatchEvent(new InputEvent('input', {
                    bubbles: true,
                    composed: true,
                    inputType: 'insertText',
                    data: response.optimized_prompt
                }));
                el.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
            }
        } catch (error) {
        }
    };

    mountPoint.appendChild(createVanillaButton(handleOptimize));
};

const observer = new MutationObserver((mutations) => {
    const inputElement = document.querySelector('.ProseMirror') || document.querySelector('[contenteditable="true"]');
    if (inputElement && !document.querySelector('#prompt-optimizer-root')) {
        mountButton(inputElement);
    }
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

const initialInput = document.querySelector('.ProseMirror') || document.querySelector('[contenteditable="true"]');
if (initialInput) {
    mountButton(initialInput);
}
