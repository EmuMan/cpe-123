bl_info = {
    "name": "Export to p5.js",
    "description": "Exports a scene to a hardcoded file using the p5.js library",
    "author": "EmuMan",
    "version": (0, 0, 1),
    "blender": (2, 90, 0),
    "location": "3D View > p5.js",
    "warning": "",
    "wiki_url": "",
    "tracker_url": "",
    "category": "Import-Export"
}

import bpy
from bpy.props import (StringProperty,
                       PointerProperty,
                       )
from bpy.types import (Panel,
                       Operator,
                       PropertyGroup,
                       )
from bpy.utils import register_class, unregister_class

from mathutils import *

class DirectProperties(PropertyGroup):

    template_filepath: StringProperty(
        name = "Template File",
        description = "The template text file to be used",
        default = "",
        maxlen = 1024,
        subtype = 'FILE_PATH'
    )

    output_dirpath: StringProperty(
        name = "Output Directory",
        description = "The directory to save the file in",
        default = "",
        maxlen = 1024,
        subtype = 'DIR_PATH'
    )

    output_filename: StringProperty(
        name = "Filename",
        description = "The name of the output file",
        default = "",
        maxlen = 1024,
        subtype = 'FILE_NAME'
    )
    
class JSONProperties(PropertyGroup):

    output_dirpath: StringProperty(
        name = "Output Directory",
        description = "The directory to save the file in",
        default = "",
        maxlen = 1024,
        subtype = 'DIR_PATH'
    )

    output_filename: StringProperty(
        name = "Filename",
        description = "The name of the output file",
        default = "",
        maxlen = 1024,
        subtype = 'FILE_NAME'
    )

class JSExport(Operator):
    bl_label = "Export Direct to JS"
    bl_idname = "wm.export_direct"

    def execute(self, context):
        scene = context.scene
        tool = scene.p5js_direct_tool

        final_lines = []

        with open(tool.template_filepath, "rt") as f:
            template_lines = f.readlines()

        for line in template_lines:
            for collection in bpy.data.collections:
                if f"%%{collection.name}%%" in line:
                    indentation = ""
                    for char in line:
                        if char == " " or char == "\t": indentation += char
                        else: break

                    for object in collection.objects:
                        if "camera" in object.name and not object.name.startswith("obj_"):
                            camera_up = object.matrix_world.to_quaternion() @ Vector((0.0, -1.0, 0.0))
                            camera_forward = object.matrix_world.to_quaternion() @ Vector((0.0, 0.0, -1.0))
                            camera_pointing = object.location + camera_forward
                            final_lines.append(indentation + 
                                    f"camera({-object.location.x}, {object.location.y}, {object.location.z}, {-camera_pointing.x}, {camera_pointing.y}, {camera_pointing.z}, {-camera_up.x}, {camera_up.y}, {camera_up.z});")
                            final_lines.append("\n")
                    
                    for object in collection.objects:
                        if object.name.startswith("obj_"):
                            object_type = object.name[4:]
                            try:
                                color = [v * 255 for v in object.active_material.node_tree.nodes[1].inputs[0].default_value[:3]]
                            except AttributeError:
                                color = [205, 205, 205]
                            final_lines.append(indentation + "push();\n")
                            final_lines.append(indentation + f"translate({-object.location.x}, {object.location.y}, {object.location.z});\n")
                            final_lines.append(indentation + f"rotateZ({-object.rotation_euler.z});\n")
                            final_lines.append(indentation + f"rotateY({-object.rotation_euler.y});\n")
                            x_rotation = object.rotation_euler.x + (3.14159265 / 2 if "box" in object_type or "cylinder" in object_type or "cone" in object_type else 0)
                            final_lines.append(indentation + f"rotateX({x_rotation});\n")
                            final_lines.append(indentation + f"fill({color[0]}, {color[1]}, {color[2]});\n")
                            if "box" in object_type:
                                final_lines.append(indentation + f"box({object.dimensions.x}, {object.dimensions.z}, {object.dimensions.y});\n")
                            elif "plane" in object_type:
                                final_lines.append(indentation + f"plane({object.dimensions.x}, {object.dimensions.y});\n")
                            elif "sphere" in object_type:
                                final_lines.append(indentation + f"sphere({object.dimensions.x / 2}, 24, 24);\n")
                            elif "cylinder" in object_type:
                                final_lines.append(indentation + f"cylinder({object.dimensions.x / 2}, {object.dimensions.z}, 24, 1, true, true);\n")
                            elif "cone" in object_type:
                                final_lines.append(indentation + f"cone({object.dimensions.x / 2}, {object.dimensions.z}, 24, 1, true);\n")
                            elif "ellipsoid" in object_type:
                                final_lines.append(indentation + f"ellipsoid({object.dimensions.x / 2}, {object.dimensions.y / 2}, {object.dimensions.z / 2}, 24, 24);\n")
                            elif "torus" in object_type:
                                final_lines.append(indentation + f"torus({(object.dimensions.x - object.dimensions.z) / 2}, {object.dimensions.z / 2});\n")
                            final_lines.append(indentation + "pop();\n")
                            final_lines.append("\n")
                        elif "light" in object.name:
                            final_lines.append(indentation + f"pointLight(255, 255, 255, {-object.location.x}, {object.location.y}, {object.location.z});\n")
                            final_lines.append("\n")
                    continue
            final_lines.append(line)
                
        with open(str(tool.output_dirpath) + str(tool.output_filename), "wt+") as f:
            f.writelines(final_lines)

        return {"FINISHED"}\

class JSONExport(Operator):
    bl_label = "Export to JSON"
    bl_idname = "wm.export_json"

    def execute(self, context):
        scene = context.scene
        tool = scene.p5js_json_tool

        final_lines = []

        with open(tool.template_filepath, "rt") as f:
            template_lines = f.readlines()

        for line in template_lines:
            for collection in bpy.data.collections:
                if f"%%{collection.name}%%" in line:
                    indentation = ""
                    for char in line:
                        if char == " " or char == "\t": indentation += char
                        else: break

                    for object in collection.objects:
                        if "camera" in object.name and not object.name.startswith("obj_"):
                            camera_up = object.matrix_world.to_quaternion() @ Vector((0.0, -1.0, 0.0))
                            camera_forward = object.matrix_world.to_quaternion() @ Vector((0.0, 0.0, -1.0))
                            camera_pointing = object.location + camera_forward
                            final_lines.append(indentation + 
                                    f"camera({-object.location.x}, {object.location.y}, {object.location.z}, {-camera_pointing.x}, {camera_pointing.y}, {camera_pointing.z}, {-camera_up.x}, {camera_up.y}, {camera_up.z});")
                            final_lines.append("\n")
                    
                    for object in collection.objects:
                        if object.name.startswith("obj_"):
                            object_type = object.name[4:]
                            try:
                                color = [v * 255 for v in object.active_material.node_tree.nodes[1].inputs[0].default_value[:3]]
                            except AttributeError:
                                color = [205, 205, 205]
                            final_lines.append(indentation + "push();\n")
                            final_lines.append(indentation + f"translate({-object.location.x}, {object.location.y}, {object.location.z});\n")
                            final_lines.append(indentation + f"rotateZ({-object.rotation_euler.z});\n")
                            final_lines.append(indentation + f"rotateY({-object.rotation_euler.y});\n")
                            x_rotation = object.rotation_euler.x + (3.14159265 / 2 if "box" in object_type or "cylinder" in object_type or "cone" in object_type else 0)
                            final_lines.append(indentation + f"rotateX({x_rotation});\n")
                            final_lines.append(indentation + f"fill({color[0]}, {color[1]}, {color[2]});\n")
                            if "box" in object_type:
                                final_lines.append(indentation + f"box({object.dimensions.x}, {object.dimensions.z}, {object.dimensions.y});\n")
                            elif "plane" in object_type:
                                final_lines.append(indentation + f"plane({object.dimensions.x}, {object.dimensions.y});\n")
                            elif "sphere" in object_type:
                                final_lines.append(indentation + f"sphere({object.dimensions.x / 2}, 24, 24);\n")
                            elif "cylinder" in object_type:
                                final_lines.append(indentation + f"cylinder({object.dimensions.x / 2}, {object.dimensions.z}, 24, 1, true, true);\n")
                            elif "cone" in object_type:
                                final_lines.append(indentation + f"cone({object.dimensions.x / 2}, {object.dimensions.z}, 24, 1, true);\n")
                            elif "ellipsoid" in object_type:
                                final_lines.append(indentation + f"ellipsoid({object.dimensions.x / 2}, {object.dimensions.y / 2}, {object.dimensions.z / 2}, 24, 24);\n")
                            elif "torus" in object_type:
                                final_lines.append(indentation + f"torus({(object.dimensions.x - object.dimensions.z) / 2}, {object.dimensions.z / 2});\n")
                            final_lines.append(indentation + "pop();\n")
                            final_lines.append("\n")
                        elif "light" in object.name:
                            final_lines.append(indentation + f"pointLight(255, 255, 255, {-object.location.x}, {object.location.y}, {object.location.z});\n")
                            final_lines.append("\n")
                    continue
            final_lines.append(line)
                
        with open(str(tool.output_dirpath) + str(tool.output_filename), "wt+") as f:
            f.writelines(final_lines)

        return {"FINISHED"}

class DirectPanel(Panel):
    bl_label = "Direct to JS"
    bl_idname = "OBJECT_PT_p5js_direct"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "p5.js"
    bl_context = "objectmode"

    @classmethod
    def poll(cls, context):
        return True
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene
        tool = scene.p5js_direct_tool

        layout.prop(tool, "template_filepath")
        layout.prop(tool, "output_dirpath")
        layout.prop(tool, "output_filename")
        layout.operator("wm.export_direct")

class JSONPanel(Panel):
    bl_label = "JSON Intermediary"
    bl_idname = "OBJECT_PT_p5js_json"
    bl_space_type = "VIEW_3D"
    bl_region_type = "UI"
    bl_category = "p5.js"
    bl_context = "objectmode"

    @classmethod
    def poll(cls, context):
        return True
    
    def draw(self, context):
        layout = self.layout
        scene = context.scene
        tool = scene.p5js_json_tool

        layout.prop(tool, "output_dirpath")
        layout.prop(tool, "output_filename")
        layout.operator("wm.export_json")

classes = (
    DirectProperties,
    JSONProperties,
    JSExport,
    JSONExport,
    DirectPanel,
    JSONPanel
)

def register():
    for cls in classes:
        register_class(cls)
    bpy.types.Scene.p5js_direct_tool = PointerProperty(type=DirectProperties)
    bpy.types.Scene.p5js_json_tool = PointerProperty(type=JSONProperties)

def unregister():
    for cls in reversed(classes):
        unregister_class(cls)
    del bpy.types.Scene.p5js_direct_tool
    del bpy.types.Scene.p5js_json_tool