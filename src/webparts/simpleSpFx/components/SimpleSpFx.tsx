import * as React from 'react';
import styles from './SimpleSpFx.module.scss';
import { ISimpleSpFxProps } from './ISimpleSpFxProps';
import { escape } from '@microsoft/sp-lodash-subset';
import SimpleSPFxForm from '../../../ui/SimpleSPFxForm';
import { sp } from "@pnp/sp/presets/all";

export default class SimpleSpFx extends React.Component<ISimpleSpFxProps, {}> {


  constructor(props: ISimpleSpFxProps) {
    super(props);
    sp.setup({
      spfxContext: this.props.spfxContext
    });
  }
  public render(): React.ReactElement<ISimpleSpFxProps> {
    return (

      <SimpleSPFxForm spfxContext={this.props.spfxContext} siteUrl={this.props.siteUrl} />

      //#region Old

      // <div className={styles.simpleSpFx}>
      //   <div className={styles.container}>
      //     <div className={styles.row}>
      //       <div className={styles.column}>
      //         <span className={styles.title}>Welcome to SharePoint!</span>
      //         <p className={styles.subTitle}>Customize SharePoint experiences using Web Parts.</p>
      //         <p className={styles.description}>{escape(this.props.description)}</p>
      //         <a href="https://aka.ms/spfx" className={styles.button}>
      //           <span className={styles.label}>Learn more</span>
      //         </a>
      //       </div>
      //     </div>
      //   </div>
      // </div>

      //#endregion Old
    );
  }
}
