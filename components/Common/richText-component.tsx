import stylesHp from '../../styles/Homepage/Homepage.module.css'
import { JSONContent } from '@tiptap/react';
import { generateHTML } from '@tiptap/html';
import { richTextProfile } from '../../lib/Common/richTextConfiguration';

type Props = {
    richText: JSONContent;
}
const RichText = ({richText}:Props) => {
    const output = generateHTML(richText,[richTextProfile]);
    return(
        <div dangerouslySetInnerHTML={{__html: output}}>
            
        </div>
    )
}

export default RichText
