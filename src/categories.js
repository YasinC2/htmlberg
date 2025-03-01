import { __ } from '@wordpress/i18n';
import { getCategories, setCategories } from '@wordpress/blocks';

// Register the custom block category
wp.domReady(() => {
    const categories = getCategories();
    
    // Ensure category does not already exist
    if (!categories.find(cat => cat.slug === 'mgb-blocks')) {
        setCategories([
            { 
                slug: 'mgb-blocks', 
                title: __('MGB Blocks', 'mgb'), 
                icon: 'screenoptions' // Optional icon
            },
            ...categories, // Keep existing categories
        ]);
    }
});
