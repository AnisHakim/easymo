import { shallow } from 'enzyme';
import { Text } from '../';
import { findByElement } from '../../Utils/Test/Test';

const setUp = (props = {}) => {
  const component = shallow(<Text {...props} />);
  return component;
};

describe('Atom Text ', () => {
  let component, component2, component3, component4, component5, component6;
  let wrapper, wrapper2, wrapper4, wrapper3, wrapper5, wrapper6;
  const onClick = jest.fn();

  beforeEach(() => {
    component = setUp({ onClick: onClick });
    wrapper = findByElement(component, 'p');
    component2 = setUp({ onClick: onClick, type: 'h2' });
    wrapper2 = findByElement(component, 'p');
    component3 = setUp({ onClick: onClick, type: 'h3' });
    wrapper3 = findByElement(component, 'p');
    component4 = setUp({ onClick: onClick, type: 'h4' });
    wrapper4 = findByElement(component, 'p');
    component5 = setUp({ onClick: onClick, type: 'h5' });
    wrapper5 = findByElement(component, 'p');
    component6 = setUp({
      onClick: onClick,
      type: 'h6',
      filter: true,
      filterText: 't'
    });
    wrapper6 = findByElement(component, 'p');
  });

  it('renders ', () => {
    expect(wrapper).toHaveLength(1);
    expect(wrapper2).toHaveLength(1);
    expect(wrapper3).toHaveLength(1);
    expect(wrapper4).toHaveLength(1);
    expect(wrapper5).toHaveLength(1);
    expect(wrapper6).toHaveLength(1);
  });

  it('onClick', () => {
    expect(wrapper.props().onClick).toEqual(onClick);
  });
});
