import { useBlockProps, InnerBlocks, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const { tag } = attributes;
    
    const blockProps = useBlockProps({
        className: `mgb-container mgb-container-${tag}`,
        as: tag,
        withoutWrapper: true,
    });

    return (
        <>
            <InspectorControls>
                <PanelBody title="Container Settings" initialOpen={true}>
                    <SelectControl
                        label="HTML Tag"
                        value={tag}
                        options={[
                            { label: 'Div', value: 'div' },
                            { label: 'Section', value: 'section' },
                            { label: 'Article', value: 'article' },
                            { label: 'Header', value: 'header' },
                            { label: 'Footer', value: 'footer' },
                            { label: 'Aside', value: 'aside' },
                            { label: 'Main', value: 'main' },
                            { label: 'Anchor (Link)', value: 'a' },
                            { label: 'Nav', value: 'nav' }
                        ]}
                        onChange={(value) => setAttributes({ tag: value })}
                    />
                </PanelBody>
            </InspectorControls>
            {/** Render the selected HTML tag dynamically */}
            {React.createElement(
                tag,
                blockProps,
                <InnerBlocks />
            )}
        </>
    );
};

export default Edit;
