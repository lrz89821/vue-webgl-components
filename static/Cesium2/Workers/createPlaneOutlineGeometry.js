/**
 * Cesium - https://github.com/AnalyticalGraphicsInc/cesium
 *
 * Copyright 2011-2017 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/AnalyticalGraphicsInc/cesium/blob/master/LICENSE.md for full licensing details.
 */
define(['./when-a55a8a4c', './Check-bc1d37d9', './Math-edfe2d1c', './Cartesian2-f0158650', './BoundingSphere-02d3af5e', './RuntimeError-7c184ac0', './WebGLConstants-4c11ee5f', './ComponentDatatype-919a7463', './GeometryAttribute-6a634ea4', './PrimitiveType-97893bc7', './FeatureDetection-bac17d71', './Transforms-5ec531c4', './GeometryAttributes-1c7ce91d'], function (when, Check, _Math, Cartesian2, BoundingSphere, RuntimeError, WebGLConstants, ComponentDatatype, GeometryAttribute, PrimitiveType, FeatureDetection, Transforms, GeometryAttributes) { 'use strict';

    /**
         * Describes geometry representing the outline of a plane centered at the origin, with a unit width and length.
         *
         * @alias PlaneOutlineGeometry
         * @constructor
         *
         */
        function PlaneOutlineGeometry() {
            this._workerName = 'createPlaneOutlineGeometry';
        }

        /**
         * The number of elements used to pack the object into an array.
         * @type {Number}
         */
        PlaneOutlineGeometry.packedLength = 0;

        /**
         * Stores the provided instance into the provided array.
         *
         * @param {PlaneOutlineGeometry} value The value to pack.
         * @param {Number[]} array The array to pack into.
         *
         * @returns {Number[]} The array that was packed into
         */
        PlaneOutlineGeometry.pack = function(value, array) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('value', value);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            return array;
        };

        /**
         * Retrieves an instance from a packed array.
         *
         * @param {Number[]} array The packed array.
         * @param {Number} [startingIndex=0] The starting index of the element to be unpacked.
         * @param {PlaneOutlineGeometry} [result] The object into which to store the result.
         * @returns {PlaneOutlineGeometry} The modified result parameter or a new PlaneOutlineGeometry instance if one was not provided.
         */
        PlaneOutlineGeometry.unpack = function(array, startingIndex, result) {
            //>>includeStart('debug', pragmas.debug);
            Check.Check.defined('array', array);
            //>>includeEnd('debug');

            if (!when.defined(result)) {
                return new PlaneOutlineGeometry();
            }

            return result;
        };

        var min = new Cartesian2.Cartesian3(-0.5, -0.5, 0.0);
        var max = new Cartesian2.Cartesian3( 0.5,  0.5, 0.0);

        /**
         * Computes the geometric representation of an outline of a plane, including its vertices, indices, and a bounding sphere.
         *
         * @returns {Geometry|undefined} The computed vertices and indices.
         */
        PlaneOutlineGeometry.createGeometry = function() {
            var attributes = new GeometryAttributes.GeometryAttributes();
            var indices = new Uint16Array(4 * 2);
            var positions = new Float64Array(4 * 3);

            positions[0] = min.x;
            positions[1] = min.y;
            positions[2] = min.z;
            positions[3] = max.x;
            positions[4] = min.y;
            positions[5] = min.z;
            positions[6] = max.x;
            positions[7] = max.y;
            positions[8] = min.z;
            positions[9] = min.x;
            positions[10] = max.y;
            positions[11] = min.z;

            attributes.position = new GeometryAttribute.GeometryAttribute({
                componentDatatype : ComponentDatatype.ComponentDatatype.DOUBLE,
                componentsPerAttribute : 3,
                values : positions
            });

            indices[0] = 0;
            indices[1] = 1;
            indices[2] = 1;
            indices[3] = 2;
            indices[4] = 2;
            indices[5] = 3;
            indices[6] = 3;
            indices[7] = 0;

            return new GeometryAttribute.Geometry({
                attributes : attributes,
                indices : indices,
                primitiveType : PrimitiveType.PrimitiveType.LINES,
                boundingSphere : new BoundingSphere.BoundingSphere(Cartesian2.Cartesian3.ZERO, Math.sqrt(2.0))
            });
        };

    function createPlaneOutlineGeometry(planeGeometry, offset) {
        if (when.defined(offset)) {
            planeGeometry = PlaneOutlineGeometry.unpack(planeGeometry, offset);
        }
        return PlaneOutlineGeometry.createGeometry(planeGeometry);
    }

    return createPlaneOutlineGeometry;

});
