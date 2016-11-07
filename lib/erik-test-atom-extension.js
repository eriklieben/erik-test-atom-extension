'use babel';

import ErikTestAtomExtensionView from './erik-test-atom-extension-view';
import { CompositeDisposable } from 'atom';

export default {

  erikTestAtomExtensionView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.erikTestAtomExtensionView = new ErikTestAtomExtensionView(state.erikTestAtomExtensionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.erikTestAtomExtensionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'erik-test-atom-extension:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.erikTestAtomExtensionView.destroy();
  },

  serialize() {
    return {
      erikTestAtomExtensionViewState: this.erikTestAtomExtensionView.serialize()
    };
  },

  toggle() {
    console.log('ErikTestAtomExtension was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
