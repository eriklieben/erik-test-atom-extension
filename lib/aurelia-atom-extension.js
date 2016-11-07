'use babel';

import AureliaAtomExtensionView from './aurelia-atom-extension-view';
import { CompositeDisposable } from 'atom';

export default {

  aureliaAtomExtensionView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.aureliaAtomExtensionView = new AureliaAtomExtensionView(state.aureliaAtomExtensionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.aureliaAtomExtensionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'aurelia-atom-extension:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.aureliaAtomExtensionView.destroy();
  },

  serialize() {
    return {
      aureliaAtomExtensionViewState: this.aureliaAtomExtensionView.serialize()
    };
  },

  toggle() {
    console.log('AureliaAtomExtension was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
