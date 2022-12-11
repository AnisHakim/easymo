import { shallow } from 'enzyme'
import { Icon } from '../'
import { findByElement } from '../../Utils/Test/Test'

const setUp = (props = {}) => {
    const component = shallow(<Icon {...props} />)
    return component
}

describe('Atom Icon ', () => {
    let component
    let wrapper
    const onClick = jest.fn();

    beforeEach(() => {
        component = setUp({ icon: "Search", onClick: onClick })
        wrapper = findByElement(component, 'IcoMoon')
    })

    it('renders', () => {
        expect(wrapper).toHaveLength(1)
    })

    it('onClick ', () => {
        expect(wrapper.props().onClick).toEqual(onClick);
    });
})
