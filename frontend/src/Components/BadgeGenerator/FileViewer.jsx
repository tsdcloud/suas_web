import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';

const FileViewer = (props) => (
  <PDFViewer>
    {/* <MyDocument /> */}
    {props.children}
  </PDFViewer>
);


export default FileViewer;