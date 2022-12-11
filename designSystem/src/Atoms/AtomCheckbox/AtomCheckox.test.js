import { shallow } from 'enzyme';
import { Checkbox } from '../';
import { findByElement } from '../../Utils/Test/Test';

const setUp = (props = {}) => {
  const component = shallow(<Checkbox {...props} />);
  return component;
};

describe('Atom Checkbox ', () => {
  let component;
  let wrapper;
  beforeEach(() => {
    component = setUp({ icon: true });
    wrapper = findByElement(component, 'div');
  });

  it('renders', () => {
    expect(wrapper).toHaveLength(1);
  });
});
