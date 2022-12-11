import { shallow } from 'enzyme'
import { Img } from '../'
import { findByElement } from '../../Utils/Test/Test'

const setUp = (props = {}) => {
    const component = shallow(<Img {...props} />)
    return component
}

describe('Atom Image ', () => {
    let component
    let wrapper
    const onClick = jest.fn();

    beforeEach(() => {
        component = setUp({ src: '/test/src', alt: "test_alt", onClick: onClick })
        wrapper = findByElement(component, 'img')
    })

    it('renders', () => {
        expect(wrapper).toHaveLength(1)
    })

    it('onClick ', () => {
        expect(wrapper.props().onClick).toEqual(onClick);
    });
    it('props', () => {
        expect(wrapper.props()).toEqual({
            alt: 'test_alt',
            src: '/test/src',
            height: '90px',
            width: '90px',
            className: 'default-img',
            onClick: onClick
        });
    });
})
