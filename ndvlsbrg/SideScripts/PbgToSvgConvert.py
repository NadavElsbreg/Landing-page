from PIL import Image

def png_to_svg(input_file, output_file):
    # Open the PNG image
    img = Image.open(input_file)

    # Create a new SVG image with the same size as the PNG image
    svg_size = img.size
    svg_content = f'<svg xmlns="http://www.w3.org/2000/svg" width="{svg_size[0]}" height="{svg_size[1]}">\n'

    # Iterate over each pixel in the PNG image and create SVG rectangles
    for y in range(svg_size[1]):
        for x in range(svg_size[0]):
            pixel_color = img.getpixel((x, y))
            svg_content += f'<rect x="{x}" y="{y}" width="1" height="1" fill="rgb({pixel_color[0]},{pixel_color[1]},{pixel_color[2]})"/>\n'

    svg_content += '</svg>'

    # Write the SVG content to the output file
    with open(output_file, 'w') as svg_file:
        svg_file.write(svg_content)

    print(f'Successfully converted {input_file} to {output_file}')

# Example usage:
input_png = '../src/assets/logo.png'
output_svg = '../src/assets/Ndvlogo.svg'
png_to_svg(input_png, output_svg)
