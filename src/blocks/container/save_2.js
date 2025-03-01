import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { tag } = attributes;

    const blockProps = useBlockProps.save();

    return React.createElement(
        tag,
        blockProps,
        <InnerBlocks.Content />
    );
};

export default Save;
