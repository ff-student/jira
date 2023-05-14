import { useMemo } from "react";
import { URLSearchParamsInit, useSearchParams } from "react-router-dom";
import { cleanObject } from "utils";

/**
 * 该代码定义了一个自定义 Hook `useUrlQueryParam`，
 * 用于在 React 组件中获取和设置 URL 中的查询参数。
 * 该 Hook 接收一个字符串类型的数组 `keys`，表示需要获取的查询参数的名称列表。
 * 返回一个元组，包含两个值：

1. 第一个值是一个对象，表示当前 URL 中对应的查询参数的键值对。
该对象的类型为 `{ [key in K]: string }`，其中 `K` 是 `keys` 数组的类型。
该值是通过 `useMemo` 钩子计算得到的，只有当 `searchParams` 发生变化时才会重新计算。

2. 第二个值是一个函数，用于设置 URL 中对应的查询参数的值。
该函数接收一个部分类型为 `{ [key in K]: unknown }` 的对象 `params`，
表示需要设置的查询参数的键值对。该函数会先将当前 URL 中所有的查询参数和 `params` 合并，
然后将合并后的结果更新到 URL 中。更新后的 URL 会触发页面重新渲染。
 */

export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setsearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          /**
           * 在这段代码中，使用了键的计算属性 (computed property names) 的写法，
           * 它允许在对象字面量中使用表达式来作为属性名。在这里，
           * [key] 将会计算得到一个字符串值，该值将作为新对象的属性名。
           * 如果没有使用 [ ] 包裹起来，那么 key 就是一个普通的字符串字面量，
           * 而不是动态地根据迭代过程中的键生成属性名。
           * 因此，在这里使用 [ ] 是必要的，以便正确地计算出属性名。
           */
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      return setsearchParam(o);
    },
  ] as const;
};
