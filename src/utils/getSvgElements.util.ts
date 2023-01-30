import { IHandlers, SvgEl, SvgTags } from "../custom";
import { RootNode, Node, ElementNode } from "svg-parser";

interface GetSvgElementsReturn {
  svgEl: SvgEl<"svg">;
  elements: SvgEl<SvgTags>[];
}

export const getSvgElements = (
  handlers: IHandlers,
  n: RootNode | Array<Node | string>,
  d: SvgEl<SvgTags>[] = [],
  svgEl?: SvgEl<"svg">
): GetSvgElementsReturn => {
  if (!Array.isArray(n)) {
    return getSvgElements(handlers, n.children, d, {
      tagName: "svg",
      props: (n as any).properties,
    });
  }

  n.forEach((e) => {
    if ((e as Node).type === "element") {
      const el = e as ElementNode;

      if (el.tagName === "svg") {
        svgEl = {
          tagName: "svg",
          props: el.properties ?? {},
        };
      } else if (handlers.has(el.tagName as SvgTags)) {
        d.push({
          tagName: el.tagName as any,
          props: el.properties ?? {},
        });
      }

      if (el.children) {
        getSvgElements(handlers, el.children, d, svgEl);
      }
    }
  });

  return { svgEl, elements: d } as any;
};
