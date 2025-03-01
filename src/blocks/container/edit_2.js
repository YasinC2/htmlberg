import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const { tag } = attributes;

    // Apply block props but without extra wrapper div
    const blockProps = useBlockProps({ withoutWrapper: true });

    // Apply inner blocks props to allow nesting other blocks
    const innerBlocksProps = useInnerBlocksProps(blockProps);

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

            {React.createElement(tag, innerBlocksProps)}
        </>
    );
};

export default Edit;
