import React              from 'react';
import classNames         from 'classnames';
import _                  from 'lodash';
import {Motion, spring}   from 'react-motion';

class WidgetTransition extends React.Component {

    static propTypes = {
        sideToShow: React.PropTypes.string
    };

    static defaultProps = {
        sideToShow: 'front'
    };

    getDefaultAnimation() {
        return {
            rotateY: -90
        };
    }

    render() {
        return (
            <Motion defaultStyle={this.getDefaultAnimation()} style={this.getAnimation()}>
                {this.renderChildren.bind(this)}
            </Motion>
        );
    }

    renderChildren(animation) {
        return (
            <div className={this.getClass()}>
                {React.Children.map(this.props.children, function (child, index) {
                    let modifiedChild;

                    if (index === 0) {
                        modifiedChild = React.cloneElement(child, {
                            className: child.props.className + ' widget-transition--widget',
                            style: _.extend ({}, child.props.style, {
                                transform: `rotateY(${(animation.rotateY) ? animation.rotateY: 0}deg)`
                            })
                        });
                    } else {
                        modifiedChild = React.cloneElement(child, {
                            className: child.props.className + ' widget-transition--widget',
                            style: _.extend ({}, child.props.style, {
                                transform: `rotateY(${-180 + animation.rotateY}deg)`
                            })
                        });
                    }

                    return modifiedChild;
                })}
            </div>
        )
    }

    getClass() {
        let classes = {
            'widget-transition': true,
            [this.props.className]: (this.props.className)
        };

        return classNames(classes);
    }

    getAnimation() {
        return {
            rotateY: (this.props.sideToShow === 'front') ? spring(0, [100, 20]) : spring(180, [100, 20])
        };
    }
}

export default WidgetTransition;
