import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { spy } from 'sinon';
import { FormattedMessage } from 'react-intl';
import Helmet from 'react-helmet';

import { Home } from '../home.component';
import messages from '../home.messages';
import { MaintainerList } from '../maintainerList/maintainerList.component';
import { LanguageSelector } from '../languageSelector/languageSelector.component';


describe('Home: Component', () => {
  const defaultProps = {
    fetchMaintainers: () => {},
    items: [1, 2, 3],
    language: 'en',
    setLanguage: () => {},
    location: {},
    match: {},
    histrory: { push: () => {} },
  };

  const component = (props) => (
    <Home {...defaultProps} {...props} />
  );

  it('should render Home root', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.home')).to.have.length(1);
  });

  it('should render <Helmet/>', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(Helmet)).to.have.length(1);
  });

  it('should pass title prop to <Helmet/>', () => {
    const wrapper = shallow(component({}));
    const helmetProps = wrapper.find(Helmet).props();

    expect(helmetProps.title).to.be.a('string');
  });

  it('should render .home__title', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.home__title')).to.have.length(1);
  });

  it('should render welcome message inside .home__title', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find('.home__title').find(FormattedMessage).prop('id')).to.equal(messages.welcome.id);
  });

  it('should render <MaintainerList />', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(MaintainerList)).to.have.length(1);
  });

  it('should pass items prop to <MaintainerList />', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(MaintainerList).prop('items')).to.equal(defaultProps.items);
  });

  it('should render <LanguageSelector />', () => {
    const wrapper = shallow(component({}));
    expect(wrapper.find(LanguageSelector)).to.have.length(1);
  });

  it('should pass props to <LanguageSelector />', () => {
    const setLanguage = spy();
    const wrapper = shallow(component({ setLanguage }));
    const languageSelectorProps = wrapper.find(LanguageSelector).props();

    expect(languageSelectorProps.language).to.equal(defaultProps.language);
    expect(languageSelectorProps.location).to.equal(defaultProps.location);
    expect(languageSelectorProps.match).to.equal(defaultProps.match);
    expect(languageSelectorProps.history).to.equal(defaultProps.history);

    languageSelectorProps.setLanguage();
    expect(setLanguage).to.have.been.called;
  });

  it('should dispatch fetchMaintainers action on mount', () => {
    const fetchMaintainers = spy();
    shallow(component({ fetchMaintainers }));

    expect(fetchMaintainers).to.have.been.calledWith(defaultProps.language);
  });

  it('should dispatch fetchMaintainers action on language change', () => {
    const fetchMaintainers = spy();
    const newLanguage = 'de';
    const wrapper = shallow(component({ fetchMaintainers, language: 'en' }));
    fetchMaintainers.reset();
    wrapper.setProps({ language: newLanguage });

    expect(fetchMaintainers).to.have.been.calledWith(newLanguage);
  });
});
