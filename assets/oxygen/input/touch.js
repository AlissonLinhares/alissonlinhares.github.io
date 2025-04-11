/*---------------------------------------------------------------------------*
 * Copyright (C) 2014 Alisson L. Carvalho, Alandesson L. Carvalho.           *
 * All rights reserved.                                                      *
 *                                                                           *
 * This file is part of the Oxygen lib.                                      *
 *                                                                           *
 * The Oxygen lib is free software: you can redistribute it and/or           *
 * modify it under the terms of the GNU Lesser General Public License as     *
 * published by the Free Software Foundation, either version 3 of the        *
 * License, or (at your option) any later version.                           *
 *                                                                           *
 * The Oxygen lib is distributed in the hope that it will be useful,         *
 * but WITHOUT ANY WARRANTY; without even the implied warranty of            *
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the              *
 * GNU Lesser General Public License for more details.                       *
 *                                                                           *
 * You should have received a copy of the GNU Lesser General Public License  *
 * along with the Oxygen lib. If not, see <http://www.gnu.org/licenses/>.    *
 *---------------------------------------------------------------------------*/

/****************************** CONSTRUCTOR **********************************
 * @final
 * @constructor
 */
var TouchPad = function() {};

/***************************** PUBLIC SECTION ********************************/
/**
 * This procedure configures the browser to map all touch events to the
 * game engine.
 * @param {Oxygen} engine: engine reference.
 **/
TouchPad.init = function( engine ) {
	/** @private {Array<Finger>} */
	var fingers = [];

	document.ontouchstart = function( event ) {

	}

	document.ontouchmove = function( event ) {

	}

	document.ontouchend = function( event ) {

	}
}
			/** @override */
			// Demo.prototype.onTouchStart = function( event ) {
			// 	Demo._x = event.targetTouches[0].pageX;
			// 	Demo._y = event.targetTouches[0].pageY;
			// }

			// /** @override */
			// Demo.prototype.onTouchMove = function( event ) {
			// 	var camera = this.getCamera();
			// 	var x = event.targetTouches[0].pageX;
			// 	var y = event.targetTouches[0].pageY;

			// 	camera.forward( (y - Demo._y) / 50 );
			// 	camera.left( (x - Demo._x) / 50 );

			// 	Demo._x = x;
			// 	Demo._y = y;
			// }
