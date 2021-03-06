# Week_01 学习笔记 (数组 链表 栈 队列)

## 改写 Deque

```java
Deque<String> deque = new LinkedList<String>();

deque.addLast("a");
deque.addLast("b");
deque.addLast("c");
System.out.println(deque);

String str = deque.peekFirst();
System.out.println(str);
System.out.println(deque);

while (deque.size() > 0) {
  System.out.println(deque.removeLast());
}
System.out.println(deque);
```
## 阅读源码

本人不写java, 读了也用不上api, 略了.

## 课前 - 第 1 课

### 五毒神掌

> 想掌握一道题, 至少要做五遍. 学习算法最大的误区就是只做一遍.

所谓五毒神掌, 是老师总结的快速刻意练习算法的五遍刷题法.

分清优先级, 时间是根据个人的优先级分配出来的.

过遍数比花大量时间在一道题上更加重要.

多过遍数, 多看解法, 多死记硬背, 杜绝死磕 AC.

#### 第一遍 初遇题

- 最多 15 分钟读题思考
- 没思路直接看解法. 注意多看不同解法, 切换 leetcode 国内外的站点, 看 high vote disguss, 对比不同解法优劣. 有思路则正常开始写代码.
- 背诵, 默写好的解法. 这一步非常重要.

#### 第二遍 初遇题

- 第一遍结束后, 立刻闭卷, 不看答案, 自己写.
- LeetCode 提交 -> debug -> accept
- 自己写出其他解法, 体会不同解法的执行时间, 直到不同解法也通过.

#### 第三遍 24 小时后

- 24 小时后, 重复做前一天的.
- 比较不同解法的熟练程度, 对不熟练的进行专项练习
- 如果工作较忙 时间不够, 课程学习时可以只进行第三遍, 将第四遍推迟. 且将第三遍第四遍简化为快速(例如 10 分钟 15 分钟)写出关键伪代码.

#### 第四遍 一周后

- 一周后, 返回练习.
- 对不熟练的进行专项练习

#### 第五遍 面试前

- 第五遍为面试前的恢复训练

### 初遇一道题的做题步骤

- 反复审题
- 列出所有能想出的可能解 (无论暴力, 非暴力, 甚至不符合题目细节要求的可能解)
- 对比可能解的时间空间复杂度, 寻找优化方式
- 写代码
- 写测试样例

### 当懵逼时

常用思维: 空间换时间, 升维, 寻找最小子问题.
如果想了一阵还是没思路, 直接看答案.

### 时间复杂度排序

- O(1)
- O(log n)
- O(n)
- O(n log n)
- O(n^2)
- O(2^n)
- O(n!)


## 第 3 课 - 数组 链表 跳表

### 数组

连续的内存空间:

|     | 时间复杂度 |
| --- | ---------- |
| 增  | O(n)       |
| 删  | O(n)       |
| 改  | O(1)       |
| 查  | O(1)       |

### 链表

- 单链表
- 双向链表
- 循环链表

|     | 时间复杂度 |
| --- | ---------- |
| 增  | O(1)       |
| 删  | O(1)       |
| 改  | O(n)       |
| 查  | O(n)       |

### 跳表

升维, 空间换时间.

### deque

双向队列, js 里的数组就是双向队列, 比较熟, 不废话.

- 插入, 删除 O(1)
- 查询 O(n)

### 优先队列(Priority Queue)

实现的具体结构较为多样复杂: heap, bst, treap

- 插入 O(1)
- 取出 O(log n)

## 课件中的题

### 283-移动零

此处只记录一次遍历解法的思路. 两者实现上其实差距不大.

思路 1 为严谨的找到 0 与非零两个值后再交换.  
思路 2 稍微抽象一些, 从头到尾遍历, i 逢非 0 就与 head 交换, head 逢交换则后移.

#### 思路 1

遍历数组, 下标为`i`, 新增`zeroIdx`用于保存遍历时遇到 0 的下标.

遍历时, 如果`zeroIdx`不指向 0, 则让`zeroIdx`后移.

当`i`指向非零 且`zeroIdx`指向 0 时, 将`zeroIdx`的值改为`i`的值, `i`位置的值改为 0. (相当于交换两者值)

```js
function moveZeroes(nums) {
  if (nums.length < 2) return nums;
  let zeroIdx = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0 && nums[zeroIdx] === 0) {
      nums[zeroIdx] = nums[i];
      nums[i] = 0;
    }
    if (nums[zeroIdx] !== 0) {
      zeroIdx++;
    }
  }
  return nums;
}
```

#### 思路 2

同上, 遍历数组, 下标为`i`, 新增`head` 用于保存有待于互换的下标, 循环时`i`基本上会走的比`head`更快.

遍历时, `i`不断后移直到遇到非零值, 则`i`与`head`上的值互换, 此时有可能`head`与`i`指向同一位置, 但并不会影响结果. 当位置互换后, `head`后移一位.

```js
function moveZeroes(nums) {
  if (nums.length < 2) return nums;
  let head = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[head], nums[i]] = [nums[i], nums[head]];
      head++;
    }
  }
  return nums;
}
```

### 11-盛最多水的容器

首先哨兵放在数组左右两侧.
此时如果想在宽度缩小的情况下增大面积, 只能移动短边的哨兵

因为移动哨兵势必导致宽度变小, 如果移动较长边, 长边无论是变长还是变短, 面积都一定会缩小, 所以排除移动长边

移动短边, 面积有可能会增大, 不断的移动, 则会筛选出较优的选择

```js
export default function maxArea(arr) {
  let area = 0;
  let left = 0;
  let right = arr.length - 1;

  while (left < right) {
    area = Math.max(getArea(arr, left, right), area);
    if (arr[left] < arr[right]) left++;
    else right--;
  }
  return area;
}

function getArea(arr, left, right) {
  return Math.min(arr[left], arr[right]) * (right - left);
}
```

### 1-两数之和

比较简单, hash 缓存遍历过的值所在下标, 则可以用空间换时间节省一轮遍历.

# 该死...

> 看来每道题都写题解, 时间根本不够用, 算了算了, 以后就在每道题上方的注释大概写一下思路吧
