import { __ } from '@wordpress/i18n';
import { getCategories, setCategories } from '@wordpress/blocks';

// Register the custom block category
wp.domReady(() => {
    const categories = getCategories();
    
    // Ensure category does not already exist
    if (!categories.find(cat => cat.slug === 'hbb-blocks')) {
        setCategories([
            { 
                slug: 'hbb-blocks', 
                title: __('HTMLBerg Blocks', 'hbb'), 
                icon: 'html' // Optional icon
            },
            ...categories, // Keep existing categories
        ]);
    }
});
