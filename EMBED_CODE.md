# 🚀 Nexus Luma AI Assistant - Website Embed Code

## 📋 **Quick Embed Code**

Copy and paste this code into any website where you want the AI assistant to appear:

```html
<!-- Nexus Luma AI Assistant Embed -->
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-host="https://ethorntonnexusluma.github.io/AIBusinesshelper/"
  data-width="420px"
  data-height="720px"
  data-open="false"
  data-color="#8b5cf6">
</script>
```

## ⚙️ **Customization Options**

### **Basic Configuration**
```html
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-host="https://ethorntonnexusluma.github.io/AIBusinesshelper/"
  data-width="420px"
  data-height="720px"
  data-open="false"
  data-color="#8b5cf6">
</script>
```

### **Available Parameters:**

| Parameter | Description | Default | Example |
|-----------|-------------|---------|---------|
| `data-host` | Your AI assistant URL | Required | `"https://ethorntonnexusluma.github.io/AIBusinesshelper/"` |
| `data-width` | Chat window width | `"420px"` | `"500px"`, `"100%"` |
| `data-height` | Chat window height | `"720px"` | `"800px"`, `"80vh"` |
| `data-open` | Open by default | `"false"` | `"true"`, `"false"` |
| `data-color` | Button accent color | `"#8b5cf6"` | `"#3b82f6"`, `"#ef4444"` |

## 🎨 **Custom Styling Examples**

### **Large Widget (Desktop)**
```html
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-width="500px"
  data-height="750px"
  data-color="#3b82f6">
</script>
```

### **Compact Widget (Mobile-Friendly)**
```html
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-width="380px"
  data-height="600px"
  data-color="#10b981">
</script>
```

### **Auto-Open Widget**
```html
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-open="true"
  data-color="#f59e0b">
</script>
```

### **Brand Colors**
```html
<!-- Purple (Default) -->
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-color="#8b5cf6">
</script>

<!-- Blue -->
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-color="#3b82f6">
</script>

<!-- Green -->
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-color="#10b981">
</script>

<!-- Orange -->
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-color="#f59e0b">
</script>

<!-- Red -->
<script src="https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js"
  data-color="#ef4444">
</script>
```

## 🌐 **Integration Examples**

### **WordPress**
1. Go to **Appearance > Theme Editor** or use a plugin like "Insert Headers and Footers"
2. Add the embed code to your theme's `footer.php` before `</body>` tag
3. Or use a custom HTML block in your page/post editor

### **Shopify**
1. Go to **Online Store > Themes**
2. Click **Actions > Edit Code**
3. Open `layout/theme.liquid`
4. Add the embed code before `</body>` tag

### **Squarespace**
1. Go to **Settings > Advanced > Code Injection**
2. Add the embed code to the **Footer** section
3. Save changes

### **Wix**
1. Go to your site editor
2. Click **Add > More > HTML Code**
3. Paste the embed code
4. Position the HTML element (set to invisible)

### **React/Next.js**
```jsx
import { useEffect } from 'react';

export default function MyPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://ethorntonnexusluma.github.io/AIBusinesshelper/nxl-embed.js';
    script.setAttribute('data-host', 'https://ethorntonnexusluma.github.io/AIBusinesshelper/');
    script.setAttribute('data-width', '420px');
    script.setAttribute('data-height', '640px');
    script.setAttribute('data-open', 'false');
    script.setAttribute('data-color', '#8b5cf6');
    document.body.appendChild(script);

    return () => {
      // Cleanup if needed
      document.body.removeChild(script);
    };
  }, []);

  return <div>Your page content</div>;
}
```

## 📱 **Mobile Responsiveness**

The embed automatically adapts to mobile devices:
- On screens smaller than 600px, the chat window expands to full width
- Height adjusts to 70% of viewport height
- Button remains accessible in bottom-right corner

## 🔧 **Advanced Configuration**

### **Custom CSS Override**
```html
<style>
  /* Custom button position */
  .nxl-ai-launcher {
    right: 16px !important;
    bottom: 16px !important;
  }
  
  /* Custom chat window position */
  .nxl-ai-frame {
    right: 16px !important;
    bottom: 92px !important;
  }
</style>
```

## 🛡️ **Security & Privacy**

- The embed runs in a sandboxed iframe
- No access to parent page content
- Secure HTTPS connection required
- Complies with CORS policies
- No cookies or tracking scripts

## 🆘 **Troubleshooting**

### **Common Issues:**

1. **Button not showing:**
   - Check if script URL is accessible
   - Ensure no ad blockers are interfering
   - Verify HTTPS connection

2. **Chat not loading:**
   - Confirm `data-host` URL is correct
   - Check browser console for errors
   - Verify iframe permissions

3. **Mobile display issues:**
   - Test on actual mobile devices
   - Check viewport meta tag exists
   - Ensure responsive CSS is not overriding

## 📞 **Support**

For technical support or custom integration assistance:
- **Email:** support@nexusluma.com
- **Documentation:** [Your docs URL]
- **GitHub:** https://github.com/EThorntonNexusLuma/AIBusinesshelper

---

© 2025 Nexus Luma - All Rights Reserved  
LumX AI Assistant - Licensed Software